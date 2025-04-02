import React from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';
import { CSSTransition } from 'react-transition-group';

import { RippleEffect } from '@/shared/ui';

const SelectorWrapper = styled.div`
  width: fit-content;
  z-index: 100;
  position: relative;
`;

const SelectorContainer = styled.button`
  gap: 8px;
  width: fit-content;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 500;
  color: rgb(var(--foreground-color));
  border-radius: 10px;
  border: 1px solid rgb(var(--border-color));
  background-color: rgba(var(--sidebar-color), 0.75);
  position: relative;
  overflow: hidden;
`;

const SelectorIcon = styled(ChevronDown)<{
  $isOpen: boolean;
  $direction: 'up' | 'down';
}>`
  transition: transform 0.3s ease-in-out;
  transform: ${({ $isOpen, $direction }) =>
    $isOpen
      ? $direction === 'down'
        ? 'rotate(180deg)'
        : 'rotate(0deg)'
      : $direction === 'down'
      ? 'rotate(0deg)'
      : 'rotate(-180deg)'};
`;

const SelectorDropdown = styled.div<{
  $direction: 'up' | 'down';
}>`
  left: 0;
  ${({ $direction }) =>
    $direction === 'down' ? 'top: 100%;' : 'bottom: 100%;'}
  ${({ $direction }) =>
    $direction === 'down' ? 'margin-top: 8px;' : 'margin-bottom: 8px;'};
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid rgb(var(--border-color));
  background-color: rgba(var(--sidebar-color), 0.8);
  position: absolute;
`;

const SelectorDropdownList = styled.ul`
  flex: 1;
  gap: 6px;
  width: 100%;
  padding: 6px;
  display: flex;
  flex-direction: column;
`;

const SelectorDropdownListItem = styled.li<{ $isActive?: boolean }>`
  gap: 10px;
  width: 100%;
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
`;

interface Props {
  children: React.ReactNode;
  border?: boolean;
  popupWidth?: number;
  direction?: 'up' | 'down';
  values: React.ReactNode[] | string[];
  targetIndex?: number;
  style?: React.CSSProperties;
  onChange: (index: number) => void;
}

export const Selector: React.FC<Props> = ({
  children,
  border = true,
  popupWidth = 272,
  direction = 'down',
  values,
  targetIndex,
  style,
  onChange,
}) => {
  const [isPopup, setIsPopup] = React.useState(false);

  const elementRef = React.useRef<HTMLDivElement>(null);
  const dropdownRef = React.useRef(null);

  const handleOnChange = (index: number) => {
    onChange(index);
    setIsPopup(false);
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        setIsPopup(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <SelectorWrapper ref={elementRef}>
      <SelectorContainer
        style={{
          ...style,
          borderColor: border ? 'rgb(var(--border-color))' : 'transparent',
        }}
        onClick={() => setIsPopup((prev) => !prev)}
      >
        {children}
        <SelectorIcon $isOpen={isPopup} $direction={direction} size={20} />
        {border && <RippleEffect />}
      </SelectorContainer>

      <CSSTransition
        nodeRef={dropdownRef}
        in={isPopup}
        timeout={300}
        classNames={direction === 'up' ? 'popup-dropup' : 'popup-dropdown'}
        unmountOnExit
      >
        <SelectorDropdown
          ref={dropdownRef}
          $direction={direction}
          style={{ width: `${popupWidth}px` }}
        >
          <SelectorDropdownList>
            {values.map((value, index) => (
              <SelectorDropdownListItem
                key={index}
                $isActive={targetIndex === index}
                onClick={() => handleOnChange(index)}
              >
                {value}
                <RippleEffect />
              </SelectorDropdownListItem>
            ))}
          </SelectorDropdownList>
        </SelectorDropdown>
      </CSSTransition>
    </SelectorWrapper>
  );
};
