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
  wordDamage: number;
}

export interface GameStatus {
  remainingTime: number;
  totalTime: number;
  bossHp: number;
  words: string[];
  targetWord: string;
  typedWord: string;
  bossScore: number | null;
  timeScore: number | null;
}

export function CombatScreen({ totalTime, wordDamage }: CombatScreenProps) {
  const [opened, { close, open }] = useDisclosure(false);
  const [currentTime, setCurrentTime] = useState(totalTime);
  const [words, setWords] = useState<string[]>([]);
  const [targetWord, setTargetWord] = useState("");
  const [typedWord, setTypedWord] = useState("");
  const [bossHp, setBossHp] = useState(100);
  const intervalRef = useRef(0);
  const gameEnded = bossHp <= 0 || currentTime <= 0;
  const error =
    targetWord && targetWord.substring(0, typedWord.length) != typedWord ? "Wrong word!" : null;

  function calculateTimeScore() {
    return (currentTime / totalTime) * 1000;
  }

  function calculateBossScore() {
    return (1 - bossHp / 100) * 1000;
  }

  useEffect(() => {
    if (bossHp <= 0 && currentTime > 0) {
      clearInterval(intervalRef.current);
      setTargetWord("");
      setTypedWord("");
      setBossHp(0);
      open();
      return;
    }

    if (bossHp > 0 && currentTime <= 0) {
      clearInterval(intervalRef.current);
      setTargetWord("");
      setTypedWord("");
      open();
      return;
    }
  }, [bossHp, currentTime]);

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word?number=50")
      .then((data) => data.json())
      .then((newWords) => {
        const word = newWords[Math.round(Math.random() * 50)];
        setWords(newWords);
        setTargetWord(word);
      })
      .then(() => {
        intervalRef.current = setInterval(() => {
          setCurrentTime((t) => t - 10);
        }, 10);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!gameEnded && targetWord.length && targetWord == typedWord) {
    const newWord = words[Math.round(Math.random() * 50)];
    setTargetWord(newWord);
    setTypedWord("");
    setBossHp(bossHp - wordDamage);
    setCurrentTime((t) => t + 1000);
  }

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
                disabled={bossHp <= 0}
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
        opened={opened}
        onClose={close}
        title="Final stats"
        centered
        closeOnClickOutside={false}
        withCloseButton={false}
        closeOnEscape={false}
      >
        <Stack align="center" gap="xs">
          <Title c={bossHp <= 0 ? "teal" : "red"} order={3}>
            {bossHp <= 0 ? "Victory" : "Defeat"}
          </Title>

          <Stack w="100%" p="xs" gap="xs" className={styles["stats-info"]}>
            <Text c="teal">
              Score: {Math.round(calculateBossScore()) + Math.round(calculateTimeScore())}
            </Text>
            <Text c="orange">
              Remaining time: {millisToFormattedTime(currentTime)}s (
              {Math.round(calculateTimeScore())}pts)
            </Text>
            <Text c="red">Boss score: {Math.round(calculateBossScore())}pts</Text>
          </Stack>

          <Button w="100%" color="teal">
            Play again
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
