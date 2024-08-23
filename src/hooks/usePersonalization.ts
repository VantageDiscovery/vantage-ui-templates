import { personalizationType } from "abstracts/PerosnalizationTypes";
import { useEffect, useState } from "react";
import localStorageService from "services/LocalStorageService";
import sessionStorageService from "services/SessionStorageService";

const QUEUE_MAX_SIZE = 10;

const usePeronalization = (): personalizationType => {
  const [isPersonalizationActive, setIsPersonalizationActive] = useState(
    localStorageService.getLocalPersonalizationConfig() === "true"
  );

  const [personalizationItems, setPersonalizationItems] = useState(
    sessionStorageService.getSessionPersonalization()?.split(",") ?? []
  );

  const [personalizationWeight, setPersonalizationWeight] = useState(
    Number(localStorageService.getLocalPersonalizationWeight())
  );

  useEffect(() => {
    Number(localStorageService.getLocalPersonalizationWeight()) !==
      personalizationWeight &&
      localStorageService.setLocalPersonalizationWeight(
        `${personalizationWeight}`
      );
  }, [personalizationWeight]);

  const toggleActivate = () => {
    setIsPersonalizationActive(!isPersonalizationActive);
  };

  const setNewQueue = (items: string[]) => {
    sessionStorageService.setSessionPersonalization(items.join(","));
    setPersonalizationItems(items);
  };

  const resetPersonalizationItems = () => {
    sessionStorageService.deleteSessionPersonalization();
    setPersonalizationItems([]);
  };

  const addPersonalizationItem = (item: string) => {
    const queue = [...personalizationItems];
    const existingIndex = queue.indexOf(item);
    existingIndex !== -1 && queue.splice(existingIndex, 1);
    queue.unshift(item);
    queue.length > QUEUE_MAX_SIZE && queue.pop();
    setNewQueue(queue);
  };

  return {
    isPersonalizationActive,
    toggleActivate,
    personalizationWeight,
    setPersonalizationWeight,
    personalizationItems,
    resetPersonalizationItems,
    addPersonalizationItem,
  };
};

export default usePeronalization;
