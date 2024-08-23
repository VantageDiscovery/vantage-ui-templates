const USERNANAME = "username";
const ANIMATION = "animation";
const PERSONALIZATION = "personalization";

const setSessionUsername = (username: string) => {
  sessionStorage.setItem(USERNANAME, JSON.stringify(username));
};

const getSessionUsername = () => {
  return sessionStorage.getItem(USERNANAME);
};

const setSessionAnimation = (isAnimation: string) => {
  sessionStorage.setItem(ANIMATION, isAnimation);
};

const getSessionAnimation = () => {
  return sessionStorage.getItem(ANIMATION);
};

const setSessionPersonalization = (personalization_items: string) => {
  sessionStorage.setItem(PERSONALIZATION, personalization_items);
};

const getSessionPersonalization = () => {
  return sessionStorage.getItem(PERSONALIZATION);
};

const deleteSessionPersonalization = () => {
  return sessionStorage.removeItem(PERSONALIZATION);
};

const sessionStorageService = {
  setSessionUsername,
  getSessionUsername,
  getSessionAnimation,
  setSessionAnimation,
  getSessionPersonalization,
  setSessionPersonalization,
  deleteSessionPersonalization,
};

export default sessionStorageService;
