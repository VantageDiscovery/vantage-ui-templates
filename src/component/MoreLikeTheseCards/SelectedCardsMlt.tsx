import { SelectedMoreLikeTheseCard } from "abstracts/useMoreLikeTheseType";
import React from "react";
import useToggle from "hooks/useToggle";
import DislikeIcon from "icons/DislikeIcon";
import LikeIcon from "icons/LikeIcon";
import ModalMoreOptions from "./ModalMoreOptions";

const SelectedCardsMlt = ({
  item,
  moreLikeTheseActions,
  liked,
}: SelectedMoreLikeTheseCard) => {
  const [isModalVisible, toggleModal] = useToggle();
  const performLike = (liked?: boolean) => {
    moreLikeTheseActions?.changedLiked({ item, liked: liked });
    toggleModal();
  };

  const performNeutral = () => {
    moreLikeTheseActions?.activeMLThese.length === 1 &&
      moreLikeTheseActions.toggleActivate();
    moreLikeTheseActions?.neutralMLTItem(item.id);
  };

  return (
    <article
      data-testid={`product-card-${item.id}`}
      className="relative flex flex-col gap-1 h-fit min-w-[300px] w-[340px] 3xl:w-[380px] box-border-2 shadow-md rounded-xl m-2"
    >
      <div className="flex w-full justify-center bg-gray-50 rounded-lg">
        <img
          src={item.imageSrc}
          alt="product"
          data-testid="product-image"
          className="relative rounded-lg h-[320px] w-full object-cover"
        />
        <button
          onClick={toggleModal}
          className={`flex px-3.5 py-1.5 rounded-full gap-2 items-center justify-between top-1 right-0 absolute`}
        >
          {liked ? (
            <LikeIcon background="blue" width="32" height="32" />
          ) : (
            <DislikeIcon background="red" width="32" height="32" />
          )}
        </button>
      </div>

      <div className="flex flex-col gap-4 px-4 pb-4 pt-2">
        <section className="flex justify-between items-center">
          <span className="h-6 line-clamp-1 font-bold text-base">
            {item.title}
          </span>
        </section>
      </div>
      <ModalMoreOptions
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        onNeutralClicked={performNeutral}
        onLikeClicked={performLike}
        likeDisabled={moreLikeTheseActions?.isAlreadySelected(item.id, true)}
        dislikeDisabled={moreLikeTheseActions?.isAlreadySelected(
          item.id,
          false
        )}
        isLiked={(liked) =>
          moreLikeTheseActions?.isAlreadySelected(item.id, liked) ?? false
        }
      />
    </article>
  );
};

export default SelectedCardsMlt;
