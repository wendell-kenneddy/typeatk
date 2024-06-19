import { Box, Button, Modal, Stack, Text, TextInput, VisuallyHidden } from "@mantine/core";
import styles from "./CombatScreen.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { getRandomWord } from "../../utils/getRandomWord";
import { DifficultyModifier } from "../../data/difficultyModifiers";
import { ResultScreen } from "../ResultScreen";
import { CombatProgressDisplay } from "../CombatProgressDisplay";
import { v4 } from "uuid";

interface CombatScreenProps {
  difficultyModifier: DifficultyModifier;
  onExitScreen: () => void;
}

export interface MatchResult {
  id: string;
  difficultyName: string;
  finalScore: number;
  timeScore: number;
  remainingTime: number;
  bossScore: number;
  difficultyMultiplier: number;
  timestamp: number;
}

export function CombatScreen({ difficultyModifier, onExitScreen }: CombatScreenProps) {
  const [opened, { close, open }] = useDisclosure(false);
  const [historySaved, setHistorySaved] = useState(false);
  const [remainingTime, setRemainingTime] = useState(difficultyModifier.totalTime);
  const [targetWord, setTargetWord] = useState("");
  const [typedWord, setTypedWord] = useState("");
  const [bossHp, setBossHp] = useState(100);
  const intervalRef = useRef<number | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const error =
    targetWord && targetWord.substring(0, typedWord.length) != typedWord ? "Wrong word!" : null;
  const gameEnded = bossHp <= 0 || remainingTime <= 0;

  useEffect(() => {
    inputRef.current?.focus();
    setTargetWord(getRandomWord());
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((t) => t - 10);
      }, 10);
    }
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

  function saveResultToHistory() {
    if (historySaved) return;
    const result = getMatchResult();
    const history: MatchResult[] = JSON.parse(localStorage.getItem("history") ?? "[]");
    if (history.length == 10) history.shift();
    history.unshift(result);
    localStorage.setItem("history", JSON.stringify(history));
    setHistorySaved(true);
  }

  function restart() {
    close();
    setTargetWord(getRandomWord());
    setTypedWord("");
    setBossHp(100);
    setRemainingTime(difficultyModifier.totalTime);
    setHistorySaved(false);
    intervalRef.current = setInterval(() => {
      setRemainingTime((t) => t - 10);
    }, 10);
    inputRef.current?.focus();
  }

  function getMatchResult(): MatchResult {
    const { finalScoreMultiplier, totalTime } = difficultyModifier;
    const timeScore = Math.round((remainingTime / totalTime) * 1000);
    const bossScore = Math.round((1 - bossHp / 100) * 1000);
    const finalScore = Math.round((timeScore + bossScore) * finalScoreMultiplier);
    return {
      id: v4(),
      difficultyName: difficultyModifier.name,
      finalScore,
      timeScore,
      bossScore,
      remainingTime,
      difficultyMultiplier: finalScoreMultiplier,
      timestamp: Date.now(),
    };
  }

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

        <CombatProgressDisplay
          remainingTime={remainingTime}
          remainingTimePercentage={(remainingTime / difficultyModifier.totalTime) * 100}
          remainingBossHpPercentage={bossHp}
        />

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
          <ResultScreen result={getMatchResult()} />

          <Stack w="100%" gap="xs">
            <Button w="100%" color="teal" onClick={restart}>
              Play again
            </Button>

            <Button w="100%" color="teal" onClick={onExitScreen}>
              Change difficulty
            </Button>

            <Button disabled={historySaved} w="100%" color="teal" onClick={saveResultToHistory}>
              {historySaved ? "Already saved" : "Save to history"}
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
}
