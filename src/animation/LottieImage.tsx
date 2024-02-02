import React from "react";
import Lottie from "react-lottie";
import animationData from "./AnimationLottie.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const LottieImage = () => {
  return <Lottie options={defaultOptions} height={500} width={500} />;
};

export default LottieImage;
