import { Button, Text, Title } from "@mantine/core";
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
        <Title order={2} size="md">
          Wow, so empty...
        </Title>
      )}
    </div>
  );
}
