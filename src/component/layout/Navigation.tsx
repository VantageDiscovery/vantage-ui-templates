import { NavigationProperties } from "abstracts/LayoutTypes";
import VantageLogoDark from "icons/VantageLogoDark";
import React from "react";
import sessionStorageService from "services/SessionStorageService";
import cn from "utils/cn";

const ANIMATION_DURATION = 2000;

const Navigation = ({
  backgroundColor,
  vantageLogoColor,
  vantageLogoColorOnAnimation,
  backgroundLeftColorOnAnimation,
  backgroundRightColorOnAnimation,
  clientLogoColor, // color to be on animation finish
  clientLogoColorOnAnimation, // color to be on animation
  clientLogoUrl,
}: NavigationProperties): JSX.Element => {
  const leftLogoStyle = {
    "--bg-color": backgroundLeftColorOnAnimation,
    clipPath: "polygon(0 0, 0 100%, 51.5% 100%, 48.5% 0)",
  } as React.CSSProperties;

  const rightLogoStyle = {
    "--bg-color": backgroundRightColorOnAnimation,
    clipPath: "polygon(48.5% 0, 51.5% 100%, 100% 100%, 100% 0)",
  } as React.CSSProperties;

  const animationDuration = {
    "--animation-duration": ANIMATION_DURATION + "ms",
  } as React.CSSProperties;

  return (
    <nav className="sticky top-0 z-10">
      <div
        className={cn(
          `max-w-screen-xxl w-full bg-${backgroundColor} flex flex-wrap items-center justify-items-stretch h-32 `,
          {
            "animate-reduce-height":
              !sessionStorageService.getSessionAnimation(),
          }
        )}
        style={animationDuration}
      >
        <div
          className={cn(
            "flex w-full absolute h-full justify-start pl-20 items-center",
            { "animate-slide-in": !sessionStorageService.getSessionAnimation() }
          )}
          style={{ ...leftLogoStyle, ...animationDuration }}
        >
          <img
            src={clientLogoUrl}
            alt="Client logo"
            className={cn("w-32 h-fit", {
              "animate-appear-left-logo":
                !sessionStorageService.getSessionAnimation(),
            })}
            style={
              {
                "--bg-start-color": clientLogoColorOnAnimation,
                "--bg-end-color": clientLogoColor,
                "--animation-duration": ANIMATION_DURATION + "ms",
              } as React.CSSProperties
            }
          />
        </div>
        <div
          className={cn(
            "flex w-full absolute h-full justify-end pr-20 items-center right-0",
            { "animate-slide-in": !sessionStorageService.getSessionAnimation() }
          )}
          style={{ ...rightLogoStyle, ...animationDuration }}
        >
          <VantageLogoDark
            vantageLogoColor={vantageLogoColor}
            vantageLogoColorOnAnimation={vantageLogoColorOnAnimation}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
