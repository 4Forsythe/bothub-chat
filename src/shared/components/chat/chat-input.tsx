import React from 'react';
import styled from 'styled-components';
import { Loader2, Menu, Send } from 'lucide-react';

import { IconButton } from '@/shared/ui';
import { useAppDispatch } from '@/app/redux';
import { setSidebarOpen } from '@/entities/sidebar';

const ChatInputWrapper = styled.div<{
  $isFocus?: boolean;
  $isLoading?: boolean;
}>`
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
    background-color: rgba(var(--secondary-color), 0.5);
  `}

  @media (max-width: 480px) {
    padding-right: 12px;
  }
`;

const HamburgerButton = styled(IconButton)`
  display: none;
  margin-left: 20px;

  @media (max-width: 1024px) {
    display: block;
  }
  @media (max-width: 480px) {
    margin-left: 12px;
  }
`;

const ChatInputField = styled.input`
  width: 100%;
  flex-grow: 1;
  margin-right: 14px;
  padding: 24px 0 24px 20px;
  font-size: 15px;
  font-weight: 500;
  font-family: var(--font-sans);
  background-color: transparent;
  border: none;

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

  @media (max-width: 480px) {
    padding: 24px 0 24px 12px;
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

export const ChatInput = React.forwardRef<HTMLInputElement, Props>(
  ({ isLoading, ...rest }, ref) => {
    const [isFocus, setIsFocus] = React.useState(false);

    const dispatch = useAppDispatch();

    return (
      <ChatInputWrapper $isFocus={isFocus} $isLoading={isLoading}>
        <HamburgerButton
          aria-label='Открыть боковую панель'
          icon={Menu}
          type='button'
          contrast
          onClick={() => dispatch(setSidebarOpen(true))}
        />
        <ChatInputField
          ref={ref}
          placeholder='Спроси о чем-нибудь...'
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          {...rest}
        />
        {isLoading ? <LoaderIcon /> : <IconButton icon={Send} type='submit' />}
      </ChatInputWrapper>
    );
  }
);

ChatInput.displayName = 'ChatInput';
