import React from "react";
import styled from "styled-components";
import { TagType } from "utils/types";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  tag?: TagType;
  className?: string;
  blur: boolean;
}

const _BlurContainer: React.FC<Props> = ({
  children,
  className,
  tag: Tag = "div"
}) => <Tag className={className}>{children}</Tag>;

export const BlurContainer = styled(_BlurContainer)<Props>`
  transition: 0.3s ease-in-out;
  will-change: filter;
  ${({ blur }) =>
    blur &&
    `
    & * {
      user-select: none;
    }
  `};
  filter: blur(${({ blur }) => (blur ? 7 : 0)}px);
`;
