import { Button, Stack, Text } from "@mantine/core";
import { MatchResult } from "../CombatScreen";
import { MatchHistoryEntry } from "../MatchHistoryEntry";
import { useState } from "react";
import styles from "./MatchHistory.module.css";

export function MatchHistory() {
  const [history, setHistory] = useState<MatchResult[]>(
    JSON.parse(localStorage.getItem("history") ?? "[]")
  );

  function handleClearHistory() {
    localStorage.removeItem("history");
    setHistory([]);
  }

  return (
    <div className={styles.container}>
      {history.length ? (
        <>
          <Button size="xs" color="red" variant="outline" onClick={handleClearHistory}>
            Clear history
          </Button>

          <Text size="xs" mt="xs">
            * Only the last 10 matches are displayed.
          </Text>

          <ul>
            {history.map((entry) => (
              <MatchHistoryEntry key={entry.id} result={entry} />
            ))}
          </ul>
        </>
      ) : (
        <Stack gap="xs" align="center">
          <Text>Wow, so empty...</Text>

          <img src="/empty-amico.svg" alt="Empty shelf illustration" width={200} height={200} />
        </Stack>
      )}
    </div>
  );
}
