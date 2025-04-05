import React from 'react';
import styled from 'styled-components';
import { Loader2, Send } from 'lucide-react';

import { IconButton } from '@/shared/ui';

const ChatInputWrapper = styled.div<{
  $isFocus?: boolean;
  $isLoading?: boolean;
}>`
  gap: 14px;
  width: 100%;
  height: 66px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 1px solid rgb(var(--border-color));
  background-color: rgb(var(--sidebar-color));
  transition: color 200ms ease-in-out, border 250ms ease-in-out,
    background 250ms ease-in-out, box-shadow 200ms ease;

  &:hover {
    background-color: rgba(var(--secondary-color), 0.35);
  }

  ${({ $isFocus }) =>
    $isFocus &&
    `
    border-color: rgb(var(--primary-color));
    background-color: rgba(var(--secondary-color), 0.5);
    box-shadow: 0 0 0 4px rgba(var(--primary-color), 0.5);
  `}

  ${({ $isLoading }) =>
    $isLoading &&
    `
    opacity: 0.75;
    pointer-events: none;
    background-color: rgba(var(--secondary-color), 0.5);
  `}
`;

const ChatInputField = styled.input`
  flex: 1;
  border: none;
  padding: 24px 0 24px 20px;
  font-size: 15px;
  font-weight: 500;
  font-family: var(--font-sans);
  background-color: transparent;

  &::placeholder {
    color: rgb(var(--muted-foreground-color));
  }

  &:disabled {
    cursor: default;
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

const LoaderIcon = styled(Loader2)`
  width: 24px;
  height: 24px;
  color: rgba(var(--muted-color), 0.75);
  animation-name: spin;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
}

export const ChatInput: React.FC<Props> = ({ isLoading, ...rest }) => {
  const [isFocus, setIsFocus] = React.useState(false);

  return (
    <ChatInputWrapper $isFocus={isFocus} $isLoading={isLoading}>
      <ChatInputField
        placeholder='Спроси о чем-нибудь...'
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        disabled={isLoading || rest.disabled}
        {...rest}
      />
      {isLoading ? <LoaderIcon /> : <IconButton icon={Send} type='submit' />}
    </ChatInputWrapper>
  );
};
