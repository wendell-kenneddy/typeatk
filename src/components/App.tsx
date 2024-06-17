import { CombatScreen } from "./CombatScreen";
import { DifficultySelect } from "./DifficultySelect";
import { Header } from "./Header";

export function App() {
  return (
    <>
      <Header />

      <main>
        {/* <DifficultySelect /> */}
        <CombatScreen totalTime={1000 * 30} />
      </main>
    </>
  );
}
