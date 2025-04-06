import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import { Heading } from '@/shared/ui';

const WelcomeAnimationWrapper = styled.div`
  inset: 0;
  opacity: 0;
  padding: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(var(--background-color));
  position: absolute;
  animation: fade-in 750ms ease-out forwards;

  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const AnimatedText = styled(Heading)`
  opacity: 0;
  animation: fade-text 1s ease-in 0.5s forwards;

  @keyframes fade-text {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

interface Props {
  user: string;
  isVisible: boolean;
}

export const WelcomeAnimation: React.FC<Props> = ({ user, isVisible }) => {
  const nodeRef = React.useRef(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isVisible}
      timeout={500}
      classNames='fade'
      unmountOnExit
    >
      <WelcomeAnimationWrapper ref={nodeRef}>
        <AnimatedText text={`Привет, ${user}`} size='lg' />
      </WelcomeAnimationWrapper>
    </CSSTransition>
  );
};
