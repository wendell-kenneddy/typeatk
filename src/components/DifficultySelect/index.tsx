import { Button, ComboboxData, NativeSelect, VisuallyHidden } from "@mantine/core";
import { useState } from "react";
import styles from "./DifficultySelect.module.css";
import { Difficulty } from "../../data/difficultyModifiers";

const difficulties: ComboboxData = [
  { label: "Easy", value: "easy" },
  { label: "Normal", value: "normal" },
  { label: "Hard", value: "hard" },
];

interface DifficultySelectProps {
  onConfirmDifficulty: (s: Difficulty) => void;
}

export function DifficultySelect({ onConfirmDifficulty }: DifficultySelectProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");

  function handleConfirmDifficulty() {
    onConfirmDifficulty(difficulty);
  }

  return (
    <div className={styles.container}>
      <VisuallyHidden>
        <h2>Select difficulty</h2>
      </VisuallyHidden>

      <NativeSelect
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value as Difficulty)}
        label="Difficulty"
        variant="filled"
        description="Higher difficulties feature quicker bosses and tighter timings."
        data={difficulties}
      />

      <Button color="teal" variant="filled" mt="sm" fullWidth onClick={handleConfirmDifficulty}>
        Play
      </Button>
    </div>
  );
}
