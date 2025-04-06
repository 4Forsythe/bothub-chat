import React from 'react';
import styled from 'styled-components';

const StyledHeading = styled.h1<{ $size: 'sm' | 'md' | 'lg' }>`
  max-width: 100%;
  word-break: break-word;
  overflow-wrap: break-word;
  font-size: ${({ $size }) =>
    $size === 'lg' ? '48px' : $size === 'md' ? '32px' : '22px'};
  font-weight: ${({ $size }) => ($size === 'lg' ? '700' : '600')};
  color: var(--foreground-color);

  @media (max-width: 480px) {
    font-size: ${({ $size }) =>
      $size === 'lg' ? '42px' : $size === 'md' ? '28px' : '20px'};
  }
`;

interface Props {
  as?: string;
  text: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Heading: React.FC<Props> = ({ as = 'h1', text, size = 'sm' }) => {
  return (
    <StyledHeading as={as} $size={size}>
      {text}
    </StyledHeading>
  );
};
