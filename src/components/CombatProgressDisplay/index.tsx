import { Progress, Stack, Text } from "@mantine/core";
import { millisToFormattedTime } from "../../utils/millisToFormattedTime";

interface CombatProgressDisplayProps {
  remainingTimePercentage: number;
  remainingBossHpPercentage: number;
  remainingTime: number;
}

export function CombatProgressDisplay({
  remainingTimePercentage,
  remainingBossHpPercentage,
  remainingTime,
}: CombatProgressDisplayProps) {
  return (
    <Stack align="center" justify="center" gap="xs">
      <Progress
        aria-label="Remaining time percentage"
        color="orange"
        value={remainingTimePercentage}
        transitionDuration={200}
        w="100%"
      />

      <Progress w="100%" aria-label="Boss HP" color="red" value={remainingBossHpPercentage} />

      <Text size="sm">{millisToFormattedTime(remainingTime)}</Text>
    </Stack>
  );
}
