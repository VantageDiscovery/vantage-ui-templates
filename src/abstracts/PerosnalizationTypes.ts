export type personalizationType = {
  isPersonalizationActive: boolean;
  toggleActivate: () => void;
  personalizationWeight: number;
  setPersonalizationWeight: (weight: number) => void;
  personalizationItems: string[];
  addPersonalizationItem: (items: string) => void;
  resetPersonalizationItems: () => void;
};
