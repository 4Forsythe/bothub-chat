import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { Globe, MessageSquarePlus, Search } from 'lucide-react';

import { IconButton, Selector } from '@/shared/ui';
import { LogoutButton, SidebarMenuItem } from '@/shared/components';
import { mockSidebarItems } from '@/shared/mocks';

const SidebarWrapper = styled.aside`
  width: 324px;
  height: 100%;
  display: flex;
  border-radius: 18px;
  background-color: rgb(var(--sidebar-color));
`;

const SidebarContainer = styled.div`
  padding: 20px 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.header`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  width: auto;
  height: 30px;
`;

const SidebarTop = styled.div`
  gap: 10px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
`;

const SidebarContent = styled.div`
  flex: 1;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgb(var(--border-color));
`;

const SidebarContentList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const languages: string[] = ['RU', 'EN'];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const [languageIndex, setLanguageIndex] = React.useState(0);

  return (
    <SidebarWrapper>
      <SidebarContainer>
        <SidebarHeader>
          <Link to='/dashboard'>
            <Logo src='/logo.svg' alt='Logo' />
          </Link>
          <Selector
            values={languages}
            targetIndex={languageIndex}
            onChange={(index) => setLanguageIndex(index)}
            style={{ gap: '6px', padding: '0', width: '68px' }}
            popupWidth={68}
            border={false}
          >
            <Globe size={18} />
            <span style={{ flex: 1 }}>{languages[languageIndex]}</span>
          </Selector>
        </SidebarHeader>
        <SidebarTop>
          <IconButton aria-label='Создать новый чат' icon={MessageSquarePlus} />
          <IconButton aria-label='Поиск среди чатов' icon={Search} contrast />
        </SidebarTop>
        <SidebarContent>
          <SidebarContentList>
            {mockSidebarItems.map((item, index) => (
              <SidebarMenuItem
                key={index}
                {...item}
                isActive={location.pathname === item.path}
              />
            ))}
          </SidebarContentList>
        </SidebarContent>
        <LogoutButton />
      </SidebarContainer>
    </SidebarWrapper>
  );
};
