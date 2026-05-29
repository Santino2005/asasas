// Cognitive Assessment Types

export type Phase = 'context1' | 'group1' | 'transition2' | 'context2' | 'group2' | 'transition3' | 'context3' | 'group3' | 'refinement' | 'complete';

export interface CardData {
  id: string;
  text: string;
  group: 1 | 2 | 3;
  order: number;
}

export interface AssessmentState {
  // Phase control
  currentPhase: Phase;
  
  // Card tracking
  cardSelections: Record<string, boolean>; // cardId -> true if "Me representa"
  currentGroupIndex: number;
  currentCardIndexInGroup: number;
  
  // Refinement stage
  refinementRanking: string[]; // selected card ids in priority order
  
  // Progress
  transitionProgress: number;
}
