import { Group, Stack, Text } from "@mantine/core";
import { MatchResult } from "../CombatScreen";
import { millisToFormattedTime } from "../../utils/millisToFormattedTime";
import styles from "./MatchHistoryEntry.module.css";

interface MatchHistoryEntryProps {
  result: MatchResult;
}

export function MatchHistoryEntry({ result }: MatchHistoryEntryProps) {
  const {
    finalScore,
    timeScore,
    bossScore,
    difficultyMultiplier,
    remainingTime,
    difficultyName,
    timestamp,
  } = result;

  return (
    <Stack className={styles.container} gap="xs" w="100%" my="md" bg="dark" py="xs" px="sm">
      <Group gap="sm" w="100%" align="center" justify="space-between">
        <Stack gap="xs" align="center">
          <Text size="xs" c="teal">
            Final Score
          </Text>
          <Text size="xs">{finalScore}</Text>
        </Stack>

        <Stack gap="xs" align="center">
          <Text size="xs" c="orange">
            Time Score
          </Text>
          <Text size="xs">{timeScore}</Text>
        </Stack>

        <Stack gap="xs" align="center">
          <Text size="xs" c="red">
            Boss score
          </Text>
          <Text size="xs">{bossScore}</Text>
        </Stack>
      </Group>

      <Stack gap="xs" align="center">
        <Group gap="sm" c="cyan">
          <Text size="xs">Multiplier: {difficultyMultiplier}</Text>
          <Text size="xs">Difficulty: {difficultyName}</Text>
        </Group>

        <Group gap="sm" c="cyan">
          <Text size="xs">Remaining time: {millisToFormattedTime(remainingTime)}s</Text>
          <Text size="xs">
            {new Date(timestamp).toLocaleDateString("pt-BR", {
              formatMatcher: "basic",
            })}
          </Text>
        </Group>
      </Stack>
    </Stack>
  );
}
