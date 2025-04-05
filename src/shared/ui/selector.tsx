import React from 'react';
import styled from 'styled-components';
import { ChevronDown, Loader } from 'lucide-react';

import { RippleEffect, SelectorDropdown } from '@/shared/ui';

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

  &:disabled {
    opacity: 0.5;
    cursor: default;
    background-color: rgba(var(--muted-color), 0.1);
  }
`;

const SelectorIcon = styled(ChevronDown)<{
  $isOpen: boolean;
  $direction: 'up' | 'down';
}>`
  flex-shrink: 0;
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

const StyledLoader = styled.div`
  width: 20px;
  height: 20px;
  color: var(--foreground-color);
  animation-name: spin;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

interface Props {
  children: React.ReactNode;
  border?: boolean;
  popupWidth?: number;
  direction?: 'up' | 'down';
  values: React.ReactNode[] | string[];
  targetIndex?: number;
  disabled?: boolean;
  disabledItems?: number[];
  isLoading?: boolean;
  style?: React.CSSProperties;
  onChange: (index: number) => void;
}

/* Note: Компонент довольно большой получился, возможно стоило использовать библиотеку... */

export const Selector: React.FC<Props> = ({
  children,
  border = true,
  popupWidth = 272,
  direction = 'down',
  values,
  targetIndex,
  disabled,
  disabledItems,
  isLoading,
  style,
  onChange,
}) => {
  const [isPopup, setIsPopup] = React.useState(false);

  const elementRef = React.useRef<HTMLDivElement>(null);

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
        type='button'
        disabled={isLoading || disabled}
        onClick={() => setIsPopup((prev) => !prev)}
      >
        {isLoading ? (
          <StyledLoader>
            <Loader size={20} />
          </StyledLoader>
        ) : (
          children
        )}
        <SelectorIcon $isOpen={isPopup} $direction={direction} size={20} />
        {border && <RippleEffect />}
      </SelectorContainer>

      <SelectorDropdown
        isVisible={isPopup}
        popupWidth={popupWidth}
        direction={direction}
        values={values}
        targetIndex={targetIndex}
        disabledItems={disabledItems}
        onChange={(index) => handleOnChange(index)}
      />
    </SelectorWrapper>
  );
};
