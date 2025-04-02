import React from 'react';
import styled from 'styled-components';

const RippleContainer = styled.div`
  inset: 0;
  overflow: hidden;
  position: absolute;
`;

const Ripple = styled.span`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 0.5s linear;
  background-color: rgba(var(--foreground-color), 0.3);
  pointer-events: none;
  position: absolute;
`;

export const RippleEffect: React.FC = () => {
  const [ripples, setRipples] = React.useState<
    { x: number; y: number; id: number }[]
  >([]);

  /* Сделал что-то вроде Material UI */
  const addRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  return (
    <RippleContainer onMouseDown={addRipple}>
      {ripples.map((ripple) => (
        <Ripple
          key={ripple.id}
          style={{ left: ripple.x - 50, top: ripple.y - 50 }}
        />
      ))}
    </RippleContainer>
  );
};
