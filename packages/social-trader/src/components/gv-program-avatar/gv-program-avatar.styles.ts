import styled, { css } from "styled-components";
import { height, right, width } from "utils/style/mixins";
import { SizesType } from "utils/types";

export interface GVProgramAvatarProps {
  className?: string;
  levelColor?: string;
  url?: string;
  alt: string;
  level?: number;
  levelProgress?: number;
  size?: SizesType | "full";
  color?: string;
  fullSize?: boolean;
  onMouseOverLevel?: (e: any) => void;
  onMouseEnterLevel?: (e: any) => void;
  onMouseLeaveLevel?: (e: any) => void;
  onClickLevel?: (e: any) => void;
}

export const $avatarXsmallSize = 24;
export const $avatarSmallSize = 40;
export const $avatarSmallLevelSize = 32;
export const $avatarMediumSize = 80;
export const $avatarMediumLevelSize = 36;
export const $avatarBigSize = 120;
export const $avatarBigLevelSize = 36;

export const $avatarSmallShift = $avatarSmallLevelSize / 1.3;
export const $levelBorder = ($avatarSmallLevelSize - 24.5) / 2;

export const GVProgramAvatarLevel = styled.div`
  position: absolute;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  ${({ size = "small" }: { size: SizesType | "full" }) => {
    switch (size) {
      case "xsmall":
        return `
        ${right(-$avatarSmallShift)}
        ${height($avatarSmallLevelSize)}
        ${width($avatarSmallLevelSize)}
        `;
      case "small":
        return `
        ${right(-$avatarSmallShift)}
        ${height($avatarSmallLevelSize)}
        ${width($avatarSmallLevelSize)}
        `;
      case "middle":
        return `
        ${right(-($avatarMediumLevelSize / 2))}
        ${height($avatarMediumLevelSize)}
        ${width($avatarMediumLevelSize)}
        `;
      case "large":
        return `
        ${right(-($avatarBigLevelSize / 2))}
        ${height($avatarBigLevelSize)}
        ${width($avatarBigLevelSize)}
        `;
    }
  }}
`;

export const GVProgramAvatarStyles = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ size = "small" }: { size?: SizesType | "full" }) => {
    switch (size) {
      case "full":
        return `
          width: 100%;
          height: 100%;
        `;
      case "xsmall":
        return `
        ${height($avatarXsmallSize)}
        ${width($avatarXsmallSize)}
        `;
      case "small":
        return `
        ${height($avatarSmallSize)}
        ${width($avatarSmallSize)}
        `;
      case "middle":
        return `
        ${height($avatarMediumSize)}
        ${width($avatarMediumSize)}
        `;
      case "large":
        return `
        ${height($avatarBigSize)}
        ${width($avatarBigSize)}
        `;
    }
  }}
`;
