import {
  Box,
  Button,
  Loader,
  Modal,
  Progress,
  Stack,
  Text,
  TextInput,
  Title,
  VisuallyHidden,
} from "@mantine/core";
import styles from "./CombatScreen.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { millisToFormattedTime } from "../../utils/millisToFormattedTime";

interface CombatScreenProps {
  totalTime: number;
}

export function CombatScreen({ totalTime }: CombatScreenProps) {
  const [, { close }] = useDisclosure(false);
  const [currentTime, setCurrentTime] = useState(totalTime);
  const [words, setWords] = useState<string[]>([]);
  const [targetWord, setTargetWord] = useState("");
  const [typedWord, setTypedWord] = useState("");
  const [bossHp, setBossHp] = useState(100);
  const intervalRef = useRef(0);
  const playerWon = targetWord.length && bossHp <= 0;
  const playerRanOutOfTime = targetWord.length && bossHp > 0 && currentTime <= 0;
  let error: string | null = null;

  if (playerWon || playerRanOutOfTime) {
    endCombat();
    return;
  }

  if (targetWord.length && typedWord == targetWord) {
    const newWord = words[Math.round(Math.random() * 50)];
    setTargetWord(newWord);
    setTypedWord("");
    setBossHp(bossHp - 5);
    setCurrentTime((t) => t + 1000);
  }

  function endCombat() {
    const timeScore = currentTime / 20_000 >= 1 ? 800 : Math.round((currentTime / 20_000) * 800);
    setTargetWord("");
    setTypedWord("");
    clearInterval(intervalRef.current);
  }

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word?number=50")
      .then((data) => data.json())
      .then((newWords) => {
        const word = newWords[Math.round(Math.random() * 50)];
        setWords(newWords);
        setTargetWord(word);
      })
      .catch((err) => console.log(err));
    intervalRef.current = setInterval(() => {
      setCurrentTime((t) => t - 10);
    }, 10);
  }, []);

  if (targetWord && targetWord.substring(0, typedWord.length) != typedWord) error = "Wrong word!";

  return (
    <>
      <div className={styles.container}>
        <VisuallyHidden>
          <h2>Now fighting</h2>
        </VisuallyHidden>

        <Stack align="center" justify="center" gap="xs">
          <Progress
            aria-label="Remaining time percentage"
            color="orange"
            value={(currentTime / totalTime) * 100}
            transitionDuration={200}
            w="100%"
          />

          <Progress
            w="100%"
            aria-label="Boss HP"
            color="red"
            value={Math.round((bossHp / 100) * 100)}
          />

          <Text size="sm">{millisToFormattedTime(currentTime)}</Text>
        </Stack>

        <Box my="md" mx="auto" w="150px" h="150px" bg="teal" />

        <Stack bg="dark" gap="md" align="center" justify="center" py="md">
          {!words.length ? (
            <Loader />
          ) : (
            <>
              <Text c="teal" size="lg">
                {targetWord}
              </Text>

              <TextInput
                disabled={!targetWord.length}
                classNames={{ input: styles.input, error: styles["input-error"] }}
                aria-label="Type the word you see above"
                onChange={(e) => setTypedWord(e.target.value)}
                value={typedWord}
                error={error}
              />
            </>
          )}
        </Stack>
      </div>

      <Modal
        classNames={{ title: styles["modal-title"] }}
        opened={!!playerWon || !!playerRanOutOfTime}
        onClose={close}
        title="Final stats"
        centered
        closeOnClickOutside={false}
        withCloseButton={false}
        closeOnEscape={false}
      >
        <Stack align="center" gap="xs">
          <Title c="teal" order={3}>
            {playerWon ? "Victory" : "Defeat"}
          </Title>

          <Stack w="100%" p="xs" gap="xs" className={styles["stats-info"]}>
            <Text c="teal">Score: 1000</Text>
            <Text c="orange">Remaining time: {currentTime}s (800pts)</Text>
            <Text c="red">Words typed: 10 (200pts)</Text>
          </Stack>

          <Button w="100%" color="teal">
            Play again
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
