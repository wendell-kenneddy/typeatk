import { Stack, Text, Title } from "@mantine/core";
import { MatchResult } from "../CombatScreen";
import { millisToFormattedTime } from "../../utils/millisToFormattedTime";
import styles from "./ResultScreen.module.css";

interface ResultSceenProps {
  result: MatchResult;
}

export function ResultScreen({ result }: ResultSceenProps) {
  const { finalScore, timeScore, bossScore, remainingTime, difficultyMultiplier } = result;
  const isDefeat = remainingTime <= 0;

  return (
    <>
      <Title c={isDefeat ? "red" : "teal"} order={3}>
        {isDefeat ? "Defeat" : "Victory"}
      </Title>

      <Stack w="100%" p="xs" gap="xs" className={styles["stats-info"]}>
        <Text c="teal" size="lg">
          Score: {finalScore}
        </Text>

        <Text c="orange" size="sm">
          Time score: {timeScore} ({millisToFormattedTime(remainingTime)}s left)
        </Text>

        <Text c="red" size="sm">
          Boss score: {bossScore}pts
        </Text>

        <Text c="cyan" size="sm">
          Difficulty multiplier: {difficultyMultiplier}x
        </Text>
      </Stack>
    </>
  );
}
