import React from 'react';
import styled from 'styled-components';
import { LogOut } from 'lucide-react';

import { Avatar } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { selectAuth, logout } from '@/entities/auth';

const LogoutWrapper = styled.div`
  gap: 12px;
  max-width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgb(var(--border-color));
  border-radius: 18px;
`;

const AvatarWrraper = styled.div`
  margin: 0 5px;
  flex-shrink: 0;
`;

const LogoutUserName = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  max-width: 168px;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  h5 {
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
  }
`;

const LogoutButtonIcon = styled.button`
  flex-shrink: 0;
  color: rgba(var(--danger-color));
  transition: transform 250ms ease, color 250ms ease;

  &:hover {
    opacity: 1;
    transform: scale(1.2);
  }

  &:active {
    transform: scale(1);
  }
`;

export const LogoutButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <LogoutWrapper>
      <AvatarWrraper>
        <Avatar isPremium />
      </AvatarWrraper>
      <LogoutUserName>
        <h3>{user.login}</h3>
        <h5>{user.tokens} TKN</h5>
      </LogoutUserName>
      <LogoutButtonIcon aria-label='Выйти из системы' onClick={handleClick}>
        <LogOut size={16} />
      </LogoutButtonIcon>
    </LogoutWrapper>
  );
};
