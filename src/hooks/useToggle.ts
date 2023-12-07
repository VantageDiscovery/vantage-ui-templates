import { useState } from "react";

const useToggle = (): [boolean, () => void] => {
  const [value, setValue] = useState(false);

  function toggle() {
    setValue(!value);
  }

  return [value, toggle];
};

export default useToggle;
