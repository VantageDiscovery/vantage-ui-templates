export type KeyWordWeightingQuery = (query: string) => Promise<KeyWordDTO>;

export type KeyWordDTO = {
  fieldValueWeighting: {
    weighted_field_values: {
      field: string;
      value: string;
      weight: number;
    }[];
    query_key_word_max_overall_weight: string;
    query_key_word_weighting_mode: string;
  };
};
