import {
  Box,
  Button,
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
import { getRandomWord } from "../../utils/getRandomWord";
import { DifficultyModifier } from "../../data/difficultyModifiers";

interface CombatScreenProps {
  difficultyModifier: DifficultyModifier;
  onExitScreen: () => void;
}

export function CombatScreen({ difficultyModifier, onExitScreen }: CombatScreenProps) {
  const [opened, { close, open }] = useDisclosure(false);
  const [remainingTime, setRemainingTime] = useState(difficultyModifier.totalTime);
  const [targetWord, setTargetWord] = useState("");
  const [typedWord, setTypedWord] = useState("");
  const [bossHp, setBossHp] = useState(100);
  const intervalRef = useRef(0);
  const gameEnded = bossHp <= 0 || remainingTime <= 0;
  const error =
    targetWord && targetWord.substring(0, typedWord.length) != typedWord ? "Wrong word!" : null;
  const inputRef = useRef<HTMLInputElement | null>(null);

  function restart() {
    close();
    setTargetWord(getRandomWord());
    setTypedWord("");
    setBossHp(100);
    setRemainingTime(difficultyModifier.totalTime);
    intervalRef.current = setInterval(() => {
      setRemainingTime((t) => t - 10);
    }, 10);
    inputRef.current?.focus();
  }

  function getTimeScore() {
    return Math.round((remainingTime / difficultyModifier.totalTime) * 1000);
  }

  function getBossScore() {
    return Math.round((1 - bossHp / 100) * 1000);
  }

  useEffect(() => {
    inputRef.current?.focus();
    setTargetWord(getRandomWord());
    intervalRef.current = setInterval(() => {
      setRemainingTime((t) => t - 10);
    }, 10);
  }, []);

  useEffect(() => {
    if (bossHp <= 0 && remainingTime > 0) {
      clearInterval(intervalRef.current);
      setTargetWord("");
      setTypedWord("");
      setBossHp(0);
      open();
      return;
    }

    if (bossHp > 0 && remainingTime <= 0) {
      clearInterval(intervalRef.current);
      setTargetWord("");
      setTypedWord("");
      open();
      return;
    }
  }, [bossHp, remainingTime]);

  if (!gameEnded && targetWord.length && targetWord == typedWord) {
    setTargetWord(getRandomWord());
    setTypedWord("");
    setBossHp(bossHp - difficultyModifier.damagePerWord);
    setRemainingTime((t) => t + difficultyModifier.bonusTimePerWord);
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
            value={(remainingTime / difficultyModifier.totalTime) * 100}
            transitionDuration={200}
            w="100%"
          />

          <Progress
            w="100%"
            aria-label="Boss HP"
            color="red"
            value={Math.round((bossHp / 100) * 100)}
          />

          <Text size="sm">{millisToFormattedTime(remainingTime)}</Text>
        </Stack>

        <Box my="md" mx="auto" w="150px" h="150px" bg="teal" />

        <Stack bg="dark" gap="md" align="center" justify="center" py="md">
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
            ref={inputRef}
          />
        </Stack>
      </div>

      <Modal
        classNames={{ title: styles["modal-title"] }}
        opened={opened}
        onClose={close}
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
            <Text c="teal" size="lg">
              Score:{" "}
              {Math.round(
                (difficultyModifier.bonusScore + getBossScore() + getTimeScore()) *
                  difficultyModifier.finalScoreMultiplier
              )}
            </Text>

            <Text c="orange" size="sm">
              Remaining time: {millisToFormattedTime(remainingTime)}s ({Math.round(getTimeScore())}
              pts)
            </Text>

            <Text c="red" size="sm">
              Boss score: {getBossScore()}pts
            </Text>

            <Text c="cyan" size="sm">
              Difficulty multiplier: {difficultyModifier.finalScoreMultiplier}x
            </Text>

            <Text c="cyan" size="sm">
              Bonus: {difficultyModifier.bonusScore}pts
            </Text>
          </Stack>

          <Stack w="100%" gap="xs">
            <Button w="100%" color="teal" onClick={restart}>
              Play again
            </Button>

            <Button w="100%" color="teal" onClick={onExitScreen}>
              Change difficulty
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
}
