import React from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';

import { IconButton } from '@/shared/ui';

const SidebarSearchContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: rgb(var(--sidebar-color));
`;

const SidebarSearchInput = styled.input<{ $isVisible?: boolean }>`
  width: 100%;
  height: 36px;
  max-width: ${({ $isVisible }) => ($isVisible ? '100%' : '0')};
  padding: ${({ $isVisible }) => ($isVisible ? '0 12px' : '0')};
  opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
  font-family: var(--font-sans);
  font-weight: 500;
  background: transparent;
  border: none;
  overflow: hidden;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgb(var(--muted-foreground-color));
  }

  &:disabled {
    opacity: 0.75;
    cursor: default;
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  style?: React.CSSProperties;
}

export const SidebarSearch: React.FC<Props> = ({ style, ...rest }) => {
  const [isActive, setIsActive] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    isActive ? inputRef.current?.focus() : inputRef.current?.blur();
  }, [isActive]);

  return (
    <SidebarSearchContainer>
      <SidebarSearchInput
        ref={inputRef}
        style={style}
        placeholder='Поиск...'
        $isVisible={isActive}
        {...rest}
      />
      <IconButton
        aria-label='Поиск среди чатов'
        icon={Search}
        contrast
        onClick={() => setIsActive((prev) => !prev)}
      />
    </SidebarSearchContainer>
  );
};
