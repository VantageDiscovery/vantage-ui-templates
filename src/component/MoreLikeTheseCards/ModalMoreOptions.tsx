import { XMarkIcon } from "@heroicons/react/24/outline";
import DislikeIcon from "icons/DislikeIcon";
import LikeIcon from "icons/LikeIcon";
import NeutralIcon from "icons/NeutralIcon";
import React, { useEffect, useRef } from "react";
import cn from "utils/cn";

const ModalMoreOptions = ({
  isVisible,
  toggleModal,
  onMoreLikeThisClicked,
  onLikeClicked,
  onNeutralClicked,
  isLiked,
  likeDisabled,
  dislikeDisabled,
}: {
  isVisible: boolean;
  likeDisabled?: boolean;
  dislikeDisabled?: boolean;
  toggleModal: () => void;
  onLikeClicked: (like?: boolean) => void;
  onMoreLikeThisClicked?: () => void;
  onNeutralClicked?: () => void;
  isLiked?: (liked: boolean) => boolean;
}): React.JSX.Element => {
  const modalContentReference = useRef<HTMLDivElement>(null);

  const closeModalOnOutsideClick = (event: MouseEvent) => {
    if (
      isVisible &&
      modalContentReference.current &&
      !modalContentReference.current.contains(event.target as Node)
    ) {
      toggleModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeModalOnOutsideClick);
    return () => {
      document.removeEventListener("mousedown", closeModalOnOutsideClick);
    };
  }, [isVisible]);

  const haveNeutral = () => {
    return likeDisabled || dislikeDisabled;
  };

  return isVisible ? (
    <div
      ref={modalContentReference}
      className="absolute flex rounded-xl z-10 flex-col items-center w-full h-full text-white opacity-90"
      style={
        {
          background:
            "linear-gradient(0deg, rgba(55, 55, 55), rgba(55, 55, 55)) , linear-gradient(0deg, #B9C1C7, #B9C1C7)",
        } as React.CSSProperties
      }
    >
      <div className="flex flex-col items-center justify-between my-10 h-full ">
        <div className="flex flex-col flex-1 justify-center items-center gap-2">
          <span className="text-2xl mb-4">Similar to These?</span>
          <span className="flex mx-5 gap-5 justify-between">
            <div className="flex flex-col items-center gap-4">
              <button
                disabled={likeDisabled}
                onClick={() => {
                  onLikeClicked(true);
                }}
              >
                <LikeIcon background={cn({ blue: isLiked?.(true) })} />
              </button>
              <p className="w-full text-center">Prefer</p>
            </div>
            {haveNeutral() ? (
              <div className="flex flex-col items-center gap-4">
                <button onClick={onNeutralClicked}>
                  <NeutralIcon />
                </button>
                <p className="w-full text-center">Neutral</p>
              </div>
            ) : (
              <span className="h-1/2 border border-white" />
            )}
            <div className="flex flex-col items-center gap-4">
              <button
                disabled={dislikeDisabled}
                onClick={() => {
                  onLikeClicked(false);
                }}
              >
                <DislikeIcon background={cn({ red: isLiked?.(false) })} />
              </button>
              <p className="w-full text-center">Eliminate</p>
            </div>
          </span>
        </div>
        {onMoreLikeThisClicked && (
          <button
            className="border rounded-xl p-2"
            onClick={onMoreLikeThisClicked}
          >
            + Similar Results
          </button>
        )}
      </div>
      <button className="absolute top-3 right-3" onClick={toggleModal}>
        <XMarkIcon width={"25px"} />
      </button>
    </div>
  ) : (
    <></>
  );
};

export default ModalMoreOptions;
