import React from 'react';
import styled from 'styled-components';

const StyledHeading = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: var(--foreground-color);
`;

interface Props {
  text: string;
}

export const Heading: React.FC<Props> = ({ text }) => {
  return <StyledHeading>{text}</StyledHeading>;
};
