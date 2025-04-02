import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 100%;
  max-width: 1290px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Container: React.FC<Props> = ({ children, style }) => {
  return <StyledContainer style={style}>{children}</StyledContainer>;
};
