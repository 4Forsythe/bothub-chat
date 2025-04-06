import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Loader2, MessageSquare, Trash } from 'lucide-react';

import type { ChatType } from '@/entities/chat';

const MenuItemWrapper = styled.li<{
  $isActive?: boolean;
  $isPending?: boolean;
}>`
  gap: 8px;
  width: 100%;
  max-width: 320px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: ${({ $isActive, $isPending }) => {
    if ($isPending && !$isActive) return '0.5';
    if ($isActive) return '1';
    return '0.75';
  }};
  font-weight: 500;
  border-radius: 12px;
  color: rgb(var(--muted-foreground-color));
  background-color: ${({ $isPending }) =>
    $isPending ? 'rgba(var(--secondary-color), .5)' : 'transparent'};
  transition: opacity 250ms ease;

  &:hover {
    opacity: 1;
  }
`;

const StyledLoader = styled(Loader2)`
  color: rgba(var(--muted-color), 0.75);
  animation-name: spin;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

/*
  Source: https://reactrouter.com/7.4.1/start/framework/navigating#navlink
  Тут можно и НУЖНО, скорее всего, использовать NavLink со статусами из RRD, но мне надо стилизовать враппер, а не саму линку, поэтому так
*/

const StyledLink = styled(Link)`
  gap: 8px;
  flex: 1;
  display: flex;
  align-items: center;
  color: rgb(var(--muted-foreground-color));
`;

type ISidebarMenuItem = {
  path: string;
  chat: ChatType;
};

interface Props extends ISidebarMenuItem {
  isActive?: boolean;
  isPending?: boolean;
  onDelete: () => void;
  onClick?: () => void;
}

export const SidebarMenuItem: React.FC<Props> = ({
  path,
  chat,
  isActive,
  isPending,
  onDelete,
  onClick,
}) => {
  return (
    <MenuItemWrapper
      $isActive={isActive}
      $isPending={isPending}
      onClick={onClick}
    >
      <StyledLink to={path}>
        <MessageSquare size={15} />
        <span
          style={{
            color: isActive
              ? 'rgb(var(--foreground-color))'
              : 'rgb(var(--muted-foreground-color))',
          }}
        >
          {chat.name}
        </span>
      </StyledLink>
      {isPending ? (
        <StyledLoader size={15} />
      ) : (
        <button onClick={onDelete}>
          <Trash size={15} />
        </button>
      )}
    </MenuItemWrapper>
  );
};
