import React from 'react';
import styled from 'styled-components';

const BadgeWrapper = styled.div`
gap: 6px;
  padding: 4px 12px;
  cursor: default;
  width: fit-content;
  display: flex;
  align-items: center
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  border-radius: 14px;
  color: rgb(var(--foreground-color));
  background-color: rgb(var(--secondary-color));
  transition: background 250ms ease;
  
  &:hover {
    background-color: rgb(var(--border-color));
  }
`;

interface Props {
  text: string;
}

/* Todo: добавить вариации и размеры (в макете не используется, я делать не стал)  */

export const Badge: React.FC<Props> = ({ text }) => {
  return <BadgeWrapper>{text}</BadgeWrapper>;
};
