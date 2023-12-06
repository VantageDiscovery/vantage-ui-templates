import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({
  isVisible,
  children,
  className,
  onCloseModal,
}: {
  isVisible: boolean;
  children: JSX.Element;
  className?: string;
  onCloseModal: () => void;
}): JSX.Element => {
  const modalContentReference = useRef<HTMLElement>(null);

  const closeModalOnOutsideClick = (event: MouseEvent) => {
    if (
      isVisible &&
      modalContentReference.current &&
      !modalContentReference.current.contains(event.target as Node)
    ) {
      onCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeModalOnOutsideClick);
    return () => {
      document.removeEventListener("mousedown", closeModalOnOutsideClick);
    };
  }, [isVisible]);

  return isVisible ? (
    createPortal(
      <div
        data-testid="modal"
        className="fixed top-0 left-0 w-full h-full z-10 bg-black bg-opacity-30 overflow-y-hidden"
      >
        <span className="flex w-full h-full justify-center items-center ">
          <section ref={modalContentReference} className={className}>
            {children}
          </section>
        </span>
      </div>,
      document.body
    )
  ) : (
    <></>
  );
};

export default Modal;
