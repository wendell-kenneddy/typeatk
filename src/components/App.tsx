import { useState } from "react";
import { CombatScreen } from "./CombatScreen";
import { DifficultySelect } from "./DifficultySelect";
import { Header } from "./Header";
import { Difficulty, difficultyModifiers } from "../data/difficultyModifiers";

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
          <DifficultySelect onConfirmDifficulty={(d) => setSelectedDifficulty(d)} />
        )}
      </main>
    </>
  );
}
