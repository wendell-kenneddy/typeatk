import { Button, ComboboxData, NativeSelect, VisuallyHidden } from "@mantine/core";
import styles from "./DifficultySelect.module.css";

const difficulties: ComboboxData = [
  { label: "Easy", value: "easy" },
  { label: "Normal", value: "normal" },
  { label: "Hard", value: "hard" },
];

export function DifficultySelect() {
  return (
    <div className={styles.container}>
      <VisuallyHidden>
        <h2>Select difficulty</h2>
      </VisuallyHidden>

      <NativeSelect
        label="Difficulty"
        variant="filled"
        description="Higher difficulties feature quicker bosses and tighter timings."
        data={difficulties}
      />

      <Button color="teal" variant="filled" mt="sm" fullWidth>
        Play
      </Button>
    </div>
  );
}
