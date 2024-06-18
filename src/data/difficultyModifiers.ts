export type Difficulty = "easy" | "normal" | "hard";

export interface DifficultyModifier {
  damagePerWord: number;
  totalTime: number;
  bonusTimePerWord: number;
  finalScoreMultiplier: number;
  bonusScore: number;
}

const easy: DifficultyModifier = {
  damagePerWord: 13,
  totalTime: 23 * 1000,
  bonusTimePerWord: 500,
  finalScoreMultiplier: 0.8,
  bonusScore: 0,
};

const normal: DifficultyModifier = {
  damagePerWord: 9,
  totalTime: 23 * 1000,
  bonusTimePerWord: 100,
  finalScoreMultiplier: 1,
  bonusScore: 0,
};

const hard: DifficultyModifier = {
  damagePerWord: 7,
  totalTime: 22 * 1000,
  bonusTimePerWord: 0,
  finalScoreMultiplier: 1.2,
  bonusScore: 450,
};

export const difficultyModifiers = {
  easy,
  normal,
  hard,
};
