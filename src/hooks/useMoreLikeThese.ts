import {
  SelectedMoreLikeTheseCard,
  useMoreLikeTheseType,
} from "abstracts/useMoreLikeTheseType";
import { useState } from "react";
import useToggle from "./useToggle";

const toggleActive = (
  activeItems: SelectedMoreLikeTheseCard[],
  itemToAdd: SelectedMoreLikeTheseCard
): SelectedMoreLikeTheseCard[] => {
  return [
    ...activeItems.filter((element) => element.item.id !== itemToAdd.item.id),
    itemToAdd,
  ];
};

const useMoreLikeThese = (): useMoreLikeTheseType => {
  const [activeMoreLikeTheseItems, setActiveMoreLikeTheseItems] = useState<
    SelectedMoreLikeTheseCard[]
  >([]);

  const [isActive, toggleActivate] = useToggle();

  const neutralMLTItem = (id: string) => {
    setActiveMoreLikeTheseItems(
      activeMoreLikeTheseItems.filter((element) => element.item.id !== id)
    );
  };

  const isAlreadySelected = (id: string, liked: boolean): boolean => {
    return activeMoreLikeTheseItems.some(
      (item) => item.item.id === id && item.liked === liked
    );
  };

  const changedLiked = (item: SelectedMoreLikeTheseCard) => {
    setActiveMoreLikeTheseItems(toggleActive(activeMoreLikeTheseItems, item));
  };

  return {
    neutralMLTItem,
    setActiveMLThese: setActiveMoreLikeTheseItems,
    activeMLThese: activeMoreLikeTheseItems,
    toggleActivate,
    isActive,
    isAlreadySelected,
    changedLiked,
  };
};

export default useMoreLikeThese;
