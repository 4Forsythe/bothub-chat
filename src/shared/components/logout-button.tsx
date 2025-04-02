import React from 'react';
import styled from 'styled-components';
import { LogOut } from 'lucide-react';

import { Avatar } from '@/shared/ui';

const LogoutWrapper = styled.div`
  gap: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgb(var(--border-color));
  border-radius: 18px;
`;

const AvatarWrraper = styled.div`
  margin: 0 5px;
`;

const LogoutUserName = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
  }
  h5 {
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
  }
`;

const LogoutButtonIcon = styled.button`
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
  return (
    <LogoutWrapper>
      <AvatarWrraper>
        <Avatar isPremium />
      </AvatarWrraper>
      <LogoutUserName>
        <h3>User</h3>
        <h5>9 012 TKN</h5>
      </LogoutUserName>
      <LogoutButtonIcon>
        <LogOut size={16} />
      </LogoutButtonIcon>
    </LogoutWrapper>
  );
};
