const setSessionUsername = (username: string) => {
  sessionStorage.setItem("username", JSON.stringify(username));
};

const getSessionUsername = () => {
  return sessionStorage.getItem("username");
};

const setSessionAnimation = (isAnimation: string) => {
  sessionStorage.setItem("animation", isAnimation);
};

const getSessionAnimation = () => {
  return sessionStorage.getItem("animation");
};

const sessionStorageService = {
  setSessionUsername,
  getSessionUsername,
  getSessionAnimation,
  setSessionAnimation,
};

export default sessionStorageService;
