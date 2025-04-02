import React from 'react';
import styled from 'styled-components';
import { Loader2, type LucideIcon } from 'lucide-react';

import { RippleEffect } from '@/shared/ui';

const StyledButton = styled.button<{ $contrast?: boolean }>`
  width: 38px;
  height: 38px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  border: 1px solid rgb(var(--border-color));
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $contrast }) =>
    $contrast ? 'var(--muted-foreground-color)' : 'var(--foreground-color)'};
  background-color: ${({ $contrast }) =>
    $contrast ? 'transparent' : 'rgb(var(--primary-color))'};
  position: relative;
  overflow: hidden;

  transition: color 200ms ease-in-out, border 250ms ease-in-out,
    background 250ms ease-in-out;

  &:hover {
    background-color: ${({ $contrast }) =>
      $contrast
        ? 'rgb(var(--secondary-color), .5)'
        : 'rgb(var(--primary-color), .75)'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
    background-color: rgba(var(--primary-color), 0.75);
  }

  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: ${({ $contrast }) =>
      $contrast
        ? '0 0 0 4px rgba(var(--secondary-color), 1)'
        : '0 0 0 4px rgba(var(--primary-color), 0.5)'};
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

interface Props
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: LucideIcon;
  contrast?: boolean;
  isLoading?: boolean;
  style?: React.CSSProperties;
}

export const IconButton: React.FC<Props> = ({
  icon: Icon,
  contrast,
  isLoading,
  style,
  ...rest
}) => {
  return (
    <StyledButton
      style={style}
      $contrast={contrast}
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      {isLoading ? (
        <StyledLoader>
          <Loader2 size={20} />
        </StyledLoader>
      ) : (
        <Icon
          style={{
            color: contrast
              ? 'rgb(var(--muted-foreground-color))'
              : 'rgb(var(--foreground-color))',
          }}
          size={20}
        />
      )}
      <RippleEffect />
    </StyledButton>
  );
};
