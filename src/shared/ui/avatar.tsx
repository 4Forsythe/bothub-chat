import React from 'react';
import styled, { css } from 'styled-components';

const AvatarWrraper = styled.div<{ $size: 'sm' | 'md'; $gradient: boolean }>`
  display: flex
  align-items: center
  justify-content: center;
  border-radius: 55px;
  overflow: hidden;
  position: relative;

  width: ${({ $size }) => ($size === 'sm' ? '18px' : '40px')};
  height: ${({ $size }) => ($size === 'sm' ? '18px' : '40px')};

  ${({ $gradient }) =>
    $gradient &&
    css`
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 50%;
        padding: 2px;
        background: linear-gradient(45deg, #ffdd55, #ff5555, #aa55ff);
        -webkit-mask: linear-gradient(white, white) content-box,
          linear-gradient(white, white);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
      }
    `}
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface Props {
  url?: string;
  size?: 'sm' | 'md';
  isPremium?: boolean;
}

export const Avatar: React.FC<Props> = ({ url, size = 'md', isPremium }) => {
  return (
    <AvatarWrraper $size={size} $gradient={!!isPremium}>
      <StyledImage src={url ? url : '/icons/avatar.svg'} alt='Аватарка' />
    </AvatarWrraper>
  );
};
