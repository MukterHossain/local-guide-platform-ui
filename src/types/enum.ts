export const TravelStyleEnum = {
  BUDGET: "BUDGET",
  STANDARD: "STANDARD",
  LUXURY: "LUXURY",
} as const;

export const TravelPaceEnum = {
  RELAXED: "RELAXED",
  MODERATE: "MODERATE",
  FAST: "FAST",
} as const;

export type TravelStyle = keyof typeof TravelStyleEnum;
export type TravelPace = keyof typeof TravelPaceEnum;