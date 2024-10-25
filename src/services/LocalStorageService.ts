const PERSONALIZATION_WEIGHT = "personalization_weight";
const PERSONALIZATION_CONFIG = "personalization_config";

const setLocalPersonalizationWeight = (weight: string) => {
  localStorage.setItem(PERSONALIZATION_WEIGHT, weight);
};

const getLocalPersonalizationWeight = () => {
  return localStorage.getItem(PERSONALIZATION_WEIGHT);
};

const setLocalPersonalizationConfig = (enable: string) => {
  localStorage.setItem(PERSONALIZATION_CONFIG, enable);
};

const getLocalPersonalizationConfig = () => {
  return localStorage.getItem(PERSONALIZATION_CONFIG);
};

const localStorageService = {
  setLocalPersonalizationConfig,
  getLocalPersonalizationConfig,
  setLocalPersonalizationWeight,
  getLocalPersonalizationWeight,
};

export default localStorageService;
