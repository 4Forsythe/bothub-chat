import React from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRightToLine,
  Globe,
  Loader,
  MessageSquarePlus,
} from 'lucide-react';
import { toast } from 'sonner';

import {
  LogoutButton,
  SidebarMenuItem,
  SidebarSearch,
} from '@/shared/components';
import { IconButton, Selector } from '@/shared/ui';
import { languages } from '@/shared/constants';

import { useAppDispatch, useAppSelector } from '@/app/redux';
import { selectSidebar, setSidebarOpen } from '@/entities/sidebar';
import { useDeleteChatMutation, useGetChatsQuery } from '@/entities/chat';

const SidebarWrapper = styled.aside<{ $isOpen: boolean }>`
  width: 100%;
  height: 100%;
  max-width: 324px;
  max-height: inherit;
  z-index: 1000;
  display: flex;
  border-radius: 18px;
  background-color: rgb(var(--sidebar-color));
  overflow: hidden;

  @media (max-width: 1024px) {
    top: 0;
    left: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
    transition: left 150ms ease;
    position: fixed;
  }
`;

const SidebarOverlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 1024px) {
    inset: 0;
    z-index: 900;
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    background-color: rgba(var(--background-color), 0.75);
    position: fixed;
  }
`;

const SidebarContainer = styled.div`
  max-width: 100%;
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
  width: 100%;
  max-width: 100%;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
`;

const SidebarContent = styled.div`
  flex: 1;
  max-width: 100%;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgb(var(--border-color));
  overflow: hidden;
`;

const SidebarContentMessage = styled.span`
  padding: 8px 0;
  font-size: 14px;
  font-style: italic;
  color: rgba(var(--muted-color), 0.8);
`;

const SidebarContentLoader = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(var(--secondary-color), 0.35);
  border-radius: 18px;
`;

const StyledLoader = styled(Loader)`
  width: 20px;
  height: 20px;
  color: rgba(var(--muted-color), 0.75);
  animation-name: spin;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

const SidebarContentList = styled.ul`
  flex: 1;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

/* Note: Тут тоже компонент довольно большой - декомпозировать и отрефакторить. */

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(selectSidebar);

  const [searchValue, setSearchValue] = React.useState('');
  const [languageIndex, setLanguageIndex] = React.useState(0);
  const [isPendingId, setIsPendingId] = React.useState<string | null>(null);

  const { data: chats, isLoading, isError } = useGetChatsQuery();
  const [deleteChat] = useDeleteChatMutation();

  const sortedChats = React.useMemo(() => {
    return chats?.data.filter((chat) =>
      chat.name.toLowerCase().includes(searchValue.trim().toLowerCase())
    );
  }, [chats, searchValue]);

  React.useEffect(() => {
    isError && toast.error('Ошибка при загрузке журнала');
  }, [isError]);

  const createChatTemplate = () => {
    navigate('/');
    dispatch(setSidebarOpen(false));
  };

  const handleDelete = async (id: string) => {
    setIsPendingId(id);
    try {
      await deleteChat(id).unwrap();
    } catch (error) {
      console.error('[chat:delete]', error);
    } finally {
      setIsPendingId(null);
      navigate('/');
    }
  };

  return (
    <React.Fragment>
      <SidebarWrapper $isOpen={isOpen}>
        <SidebarContainer>
          <SidebarHeader>
            <Link to='/' style={{ marginRight: 'auto' }}>
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
              <Globe style={{ flexShrink: 0 }} size={18} />
              <span style={{ flex: 1 }}>{languages[languageIndex]}</span>
            </Selector>
            {isOpen && (
              <IconButton
                aria-label='Скрыть боковую панель'
                icon={ArrowRightToLine}
                contrast
                style={{ marginLeft: '10px', border: 'none' }}
                onClick={() => dispatch(setSidebarOpen(false))}
              />
            )}
          </SidebarHeader>
          <SidebarTop>
            <IconButton
              aria-label='Создать новый чат'
              icon={MessageSquarePlus}
              onClick={createChatTemplate}
            />
            <SidebarSearch
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </SidebarTop>
          <SidebarContent>
            {isLoading ? (
              <SidebarContentLoader>
                <StyledLoader size={20} />
              </SidebarContentLoader>
            ) : (
              <SidebarContentList>
                {sortedChats && sortedChats.length > 0 ? (
                  sortedChats.map((item, index) => (
                    <SidebarMenuItem
                      key={index}
                      chat={item}
                      path={`/chat/${item.id}`}
                      isActive={location.pathname.includes(item.id)}
                      isPending={isPendingId === item.id}
                      onDelete={() => handleDelete(item.id)}
                      onClick={() => dispatch(setSidebarOpen(false))}
                    />
                  ))
                ) : isError ? (
                  <SidebarContentMessage>
                    Ошибка при загрузке журнала
                  </SidebarContentMessage>
                ) : (
                  <SidebarContentMessage>Ваш журнал пуст</SidebarContentMessage>
                )}
              </SidebarContentList>
            )}
          </SidebarContent>
          <LogoutButton />
        </SidebarContainer>
      </SidebarWrapper>
      <SidebarOverlay
        $isOpen={isOpen}
        onClick={() => dispatch(setSidebarOpen(false))}
      />
    </React.Fragment>
  );
};
