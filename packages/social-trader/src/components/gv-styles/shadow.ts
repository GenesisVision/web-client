import {
  $backgroundColor,
  $panelBackgroundColor
} from "components/gv-styles/gv-colors/gv-colors";

export const $shadowWidth = 50;
export const $defaultShadow = $panelBackgroundColor;
export const $darkShadow = $backgroundColor;

export const shadowBackground = (side: "left" | "right", color: string) => {
  switch (side) {
    case "left":
      return `
        background: linear-gradient(
          90deg,
          ${color},
          ${color}03 ${$shadowWidth}px
        );
      `;
    case "right":
      return `
        background: linear-gradient(
          90deg,
          ${color}03,
          ${color} ${$shadowWidth}px
        );
      `;
  }
};

export const shadowMain = () => {
  return `
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: ${$shadowWidth}px;
    z-index: 2;
    transition: opacity 250ms ease-in-out;
    pointer-events: none;
  `;
};

export const rightShadow = (color: string = $defaultShadow) => {
  return `
    ${shadowMain()};
    ${shadowBackground("right", color)};
    right: 0;
  `;
};

export const leftShadow = (color: string = $defaultShadow) => {
  return `
    ${shadowMain()};
    ${shadowBackground("left", color)};
    left: 0;
  `;
};

export const rightDarkShadow = () => {
  return rightShadow($darkShadow);
};

export const leftDarkShadow = () => {
  return leftShadow($darkShadow);
};
