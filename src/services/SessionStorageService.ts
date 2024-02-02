const setSessionUsername = (username: string) => {
  sessionStorage.setItem("username", JSON.stringify(username));
};

const getSessionUsername = () => {
  return sessionStorage.getItem("username");
};

const sessionStorageService = {
  setSessionUsername,
  getSessionUsername,
};

export default sessionStorageService;
