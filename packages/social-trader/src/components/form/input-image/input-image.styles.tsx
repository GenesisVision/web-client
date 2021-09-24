import { Text } from "components/text/text";
import styled from "styled-components";
import {
  $negativeColor,
  $panelBackgroundColor,
  $primaryColor,
  $separatorColor
} from "utils/style/colors";
import { mediaBreakpointTablet } from "utils/style/media";

export const InputImageContainer = styled.div<{ error?: boolean }>`
  width: 200px;
  min-height: 200px;
  position: relative;
  border: 2px solid ${$separatorColor};

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  & .cropper-bg {
    background-image: none;
  }

  & .cropper-face {
    opacity: 0;
  }

  ${mediaBreakpointTablet(`min-height: 210px;`)}
  ${({ error }) => error && `border-color: ${$negativeColor};`}
`;

export const InputImageDropZoneContent = styled.div`
  position: relative;
`;

export const InputImageImageContainer = styled.div`
  padding: 20px;
  width: 100%;
  min-height: 160px;
  box-sizing: border-box;
  display: flex;
  align-content: center;
  justify-content: center;

  img {
    max-height: 160px;
  }
`;

export const InputImageStyledText = styled(Text)<{
  desktop?: boolean;
  mobile?: boolean;
}>`
  margin-top: 6px;
  margin-bottom: 0;
  text-align: center;
  ${({ desktop }) =>
    desktop &&
    `display: none;
     ${mediaBreakpointTablet(`display: block;`)}
     `};
  ${({ mobile }) =>
    mobile &&
    `display: block;
      color: ${$primaryColor};
      cursor: pointer;
     ${mediaBreakpointTablet(`display: none;`)}
     `};
`;

export const InputImageStyledSpan = styled.span`
  color: ${$primaryColor};
  cursor: pointer;
`;

export const InputImageClearButton = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: -15px;
  right: -15px;
  cursor: pointer;
  background-color: ${$panelBackgroundColor};
  border-radius: 15px;
  border: 1px solid ${$separatorColor};
  text-align: center;
  line-height: 30px;
  font-size: 11px;
  box-sizing: border-box;
  z-index: 6;
`;

export const InputImageError = styled.div`
  position: absolute;
  bottom: -34px;
  border-color: ${$negativeColor};
  color: ${$negativeColor};
  font-size: 0.7em;
  width: 100%;
  text-align: center;
`;

export const DropZoneWrapperContainer = styled.div`
  outline: none;
  position: relative;
`;

export const DropZoneWrapperIndicator = styled.div<{ width?: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  opacity: 0.5;
  background: ${$primaryColor};
  width: ${({ width }) => `${width}%`};
`;

export const DropZoneWrapperHelper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 5;
  display: flex;
  border: 2px dashed grey;
  font-size: 15px;
  text-align: center;
  justify-content: center;
  align-items: center;
`;
