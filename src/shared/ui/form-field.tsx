import React from 'react';
import styled from 'styled-components';

const StyledField = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledFieldLabel = styled.label`
  margin-bottom: 8px;
`;

const StyledFieldInput = styled.input`
  width: 100%;
  height: 54px;
  padding: 16px;
  font-family: var(--font-sans);
  border-radius: 8px;
  border: 1px solid rgb(var(--border-color));
  background-color: rgb(var(--sidebar-color));
  transition: color 200ms ease-in-out, border 250ms ease-in-out,
    background 250ms ease-in-out, box-shadow 200ms ease;

  &::placeholder {
    color: rgb(var(--muted-foreground-color));
  }

  &:hover {
    background-color: rgba(var(--sidebar-color), 0.75);
  }

  &:disabled {
    opacity: 0.75;
    cursor: default;
    background-color: rgba(var(--sidebar-color), 0.75);
  }

  &:focus,
  &:focus-visible {
    outline: none;
    background-color: rgba(var(--sidebar-color), 0.75);
    box-shadow: 0 0 0 4px rgba(var(--primary-color), 0.5);
  }
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isLoading?: boolean;
  style?: React.CSSProperties;
}

export const FormField: React.FC<Props> = ({
  label,
  isLoading,
  style,
  ...rest
}) => {
  return (
    <StyledField>
      {label && <StyledFieldLabel htmlFor={label}>{label}</StyledFieldLabel>}
      <StyledFieldInput
        id={label}
        style={style}
        disabled={isLoading || rest.disabled}
        {...rest}
      />
    </StyledField>
  );
};
