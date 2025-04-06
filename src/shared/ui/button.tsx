import React from 'react';
import styled from 'styled-components';
import { Loader } from 'lucide-react';

import { RippleEffect } from '@/shared/ui';

const StyledButton = styled.button`
  gap: 6px;
  width: fit-content;
  height: 52px;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  border: 1px solid rgb(var(--border-color));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--foreground-color);
  background-color: rgb(var(--primary-color));
  position: relative;
  overflow: hidden;

  transition: color 200ms ease-in-out, border 250ms ease-in-out,
    background 250ms ease-in-out;

  &:hover {
    background-color: rgba(var(--primary-color), 0.75);
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
    background-color: rgba(var(--primary-color), 0.75);
  }

  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px rgba(var(--primary-color), 0.5);
  }

  @media (max-width: 480px) {
    height: 45px;
    padding: 12px 20px;
  }
`;

const StyledLoader = styled.div`
  width: 20px;
  height: 20px;
  color: var(--foreground-color);
  animation-name: spin;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode | string;
  isLoading?: boolean;
  style?: React.CSSProperties;
}

/* Todo: добавить вариации и размеры (в макете не используется, я делать не стал)  */

export const Button: React.FC<Props> = ({
  children,
  isLoading,
  style,
  ...rest
}) => {
  return (
    <StyledButton style={style} disabled={isLoading || rest.disabled} {...rest}>
      {isLoading ? (
        <StyledLoader>
          <Loader size={20} />
        </StyledLoader>
      ) : (
        children
      )}
      <RippleEffect />
    </StyledButton>
  );
};
