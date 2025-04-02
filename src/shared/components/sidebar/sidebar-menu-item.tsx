import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MessageSquare, Trash } from 'lucide-react';

const MenuItemWrapper = styled.li<{ $isActive?: boolean }>`
  gap: 8px;
  width: 100%;
  max-width: 320px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: ${({ $isActive }) => ($isActive ? '1' : '0.75')};
  font-weight: 500;
  color: rgb(var(--muted-foreground-color));
  transition: opacity 250ms ease;

  &:hover {
    opacity: 1;
  }
`;

const StyledLink = styled(Link)`
  gap: 8px;
  flex: 1;
  display: flex;
  align-items: center;
  color: rgb(var(--muted-foreground-color));
`;

type ISidebarMenuItem = {
  path: string;
  name: string;
};

interface Props extends ISidebarMenuItem {
  isActive?: boolean;
}

export const SidebarMenuItem: React.FC<Props> = ({ path, name, isActive }) => {
  return (
    <MenuItemWrapper $isActive={isActive}>
      <StyledLink to={path}>
        <MessageSquare size={15} />
        <span
          style={{
            color: isActive
              ? 'rgb(var(--foreground-color))'
              : 'rgb(var(--muted-foreground-color))',
          }}
        >
          {name}
        </span>
      </StyledLink>
      <button>
        <Trash size={15} />
      </button>
    </MenuItemWrapper>
  );
};
