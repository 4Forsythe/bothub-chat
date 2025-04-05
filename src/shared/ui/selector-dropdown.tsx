import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import { RippleEffect } from '@/shared/ui';

const SelectorDropdownWrapper = styled.div<{
  $direction: 'up' | 'down';
}>`
  left: 0;
  ${({ $direction }) =>
    $direction === 'down' ? 'top: 100%;' : 'bottom: 100%;'}
  ${({ $direction }) =>
    $direction === 'down' ? 'margin-top: 8px;' : 'margin-bottom: 8px;'};
  max-height: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid rgb(var(--border-color));
  background-color: rgba(var(--sidebar-color), 0.8);
  overflow-y: auto;
  position: absolute;
`;

const SelectorDropdownList = styled.ul`
  flex: 1;
  gap: 6px;
  width: 100%;
  max-height: 100%;
  padding: 6px;
  display: flex;
  flex-direction: column;
`;

const SelectorDropdownListItem = styled.button<{ $isActive?: boolean }>`
  gap: 10px;
  width: 100%;
  height: fit-content;
  padding: 12px;
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${({ $isActive }) =>
    $isActive ? 'rgb(var(--secondary-color))' : 'transparent'};
  transition: background 250ms ease;
  position: relative;
  overflow: hidden;

  &:hover {
    ${({ $isActive }) =>
      !$isActive && 'background-color: rgba(var(--border-color), 0.15)'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
    background-color: rgba(var(--secondary-color), 0.35);
  }
`;

interface Props {
  isVisible?: boolean;
  popupWidth?: number;
  direction: 'up' | 'down';
  values: React.ReactNode[] | string[];
  targetIndex?: number;
  disabledItems?: number[];
  onChange: (index: number) => void;
}

export const SelectorDropdown: React.FC<Props> = ({
  isVisible,
  popupWidth,
  direction,
  values,
  targetIndex,
  disabledItems,
  onChange,
}) => {
  const nodeRef = React.useRef(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isVisible}
      timeout={300}
      classNames={direction === 'up' ? 'popup-dropup' : 'popup-dropdown'}
      unmountOnExit
    >
      <SelectorDropdownWrapper
        ref={nodeRef}
        $direction={direction}
        style={{ width: `${popupWidth}px` }}
      >
        <SelectorDropdownList>
          {values.map((value, index) => (
            <SelectorDropdownListItem
              key={index}
              $isActive={targetIndex === index}
              disabled={disabledItems?.includes(index)}
              onClick={() => onChange(index)}
            >
              {value}
              <RippleEffect />
            </SelectorDropdownListItem>
          ))}
        </SelectorDropdownList>
      </SelectorDropdownWrapper>
    </CSSTransition>
  );
};
