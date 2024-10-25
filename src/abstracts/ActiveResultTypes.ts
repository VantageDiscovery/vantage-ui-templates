export enum Action {
  "SEMANTIC",
  "MORE_LIKE_THIS",
  "MORE_LIKE_THESE",
  "VIBE_TEXT",
  "VIBE_DOCUMENT_ID",
  "PERSONALIZATION",
}

export type activeResultType = {
  activeResult: Action;
  setResult: (result: Action) => void;
  lastResult: Action;
};
