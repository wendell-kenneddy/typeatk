export type Difficulty = "easy" | "normal" | "hard";

export interface DifficultyModifier {
  bossImg: string;
  name: string;
  damagePerWord: number;
  totalTime: number;
  bonusTimePerWord: number;
  finalScoreMultiplier: number;
}

const easy: DifficultyModifier = {
  bossImg: "/easy-boss.png",
  name: "Easy",
  damagePerWord: 13,
  totalTime: 23 * 1000,
  bonusTimePerWord: 500,
  finalScoreMultiplier: 0.8,
};

const normal: DifficultyModifier = {
  bossImg: "/normal-boss.png",
  name: "Normal",
  damagePerWord: 9,
  totalTime: 23 * 1000,
  bonusTimePerWord: 100,
  finalScoreMultiplier: 1,
};

const hard: DifficultyModifier = {
  bossImg: "/hard-boss.png",
  name: "Hard",
  damagePerWord: 7,
  totalTime: 20 * 1000,
  bonusTimePerWord: 0,
  finalScoreMultiplier: 1.35,
};

export const difficultyModifiers = {
  easy,
  normal,
  hard,
};
