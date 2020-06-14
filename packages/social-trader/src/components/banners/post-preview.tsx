import React from "react";

export const PostPreview: React.FC<{
  containerSize: { width: number; height: number };
}> = ({ containerSize: { width, height } }) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width={width} height={height} fill="#FFF" />
    </svg>
  );
};
