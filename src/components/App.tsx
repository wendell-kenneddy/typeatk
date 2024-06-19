import { useState } from "react";
import { CombatScreen } from "./CombatScreen";
import { DifficultySelect } from "./DifficultySelect";
import { Header } from "./Header";
import { Difficulty, difficultyModifiers } from "../data/difficultyModifiers";
import { Tabs } from "@mantine/core";
import { MatchHistory } from "./MatchHistory";

export function App() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

  return (
    <>
      <Header />

      <main>
        {selectedDifficulty ? (
          <CombatScreen
            difficultyModifier={difficultyModifiers[selectedDifficulty]}
            onExitScreen={() => setSelectedDifficulty(null)}
          />
        ) : (
          <Tabs mx="auto" maw={375} mt="md" defaultValue="difficulty-select" color="teal">
            <Tabs.List flex="true" justify="center">
              <Tabs.Tab value="difficulty-select">Difficulty</Tabs.Tab>
              <Tabs.Tab value="match-history">History</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="difficulty-select">
              <DifficultySelect onConfirmDifficulty={(d) => setSelectedDifficulty(d)} />
            </Tabs.Panel>

            <Tabs.Panel value="match-history">
              <MatchHistory />
            </Tabs.Panel>
          </Tabs>
        )}
      </main>
    </>
  );
}
