import { $backgroundColor, $panelBackgroundColor } from "utils/style/colors";

export const $shadowWidth = 50;
export const $defaultShadow = $panelBackgroundColor;
export const $darkShadow = $backgroundColor;

export const $boxShadow1 =
  "0 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) !important";
export const $boxShadow2 =
  "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important";
export const $boxShadow4 =
  "0 6px 6px -3px rgba(0, 0, 0, 0.2), 0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12) !important";

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
