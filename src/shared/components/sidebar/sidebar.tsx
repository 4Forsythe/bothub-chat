import React from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Globe, Loader, MessageSquarePlus, Search } from 'lucide-react';
import { toast } from 'sonner';

import { IconButton, Selector } from '@/shared/ui';
import { LogoutButton, SidebarMenuItem } from '@/shared/components';
import { useDeleteChatMutation, useGetChatsQuery } from '@/entities/chat';

const SidebarWrapper = styled.aside`
  width: 324px;
  height: 100%;
  max-height: inherit;
  display: flex;
  border-radius: 18px;
  background-color: rgb(var(--sidebar-color));
  overflow: hidden;
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

const languages: string[] = ['RU', 'EN'];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isPendingId, setIsPendingId] = React.useState<string | null>(null);
  const [languageIndex, setLanguageIndex] = React.useState(0);

  const { data: chats, isLoading, isError } = useGetChatsQuery();
  const [deleteChat] = useDeleteChatMutation();

  React.useEffect(() => {
    if (isError) {
      toast.error('Не удалось загрузить список чатов');
    }
  }, [isError]);

  const createChatTemplate = () => {
    navigate('/');
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
    <SidebarWrapper>
      <SidebarContainer>
        <SidebarHeader>
          <Link to='/'>
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
        </SidebarHeader>
        <SidebarTop>
          <IconButton
            aria-label='Создать новый чат'
            icon={MessageSquarePlus}
            onClick={createChatTemplate}
          />
          <IconButton aria-label='Поиск среди чатов' icon={Search} contrast />
        </SidebarTop>
        <SidebarContent>
          {isLoading ? (
            <SidebarContentLoader>
              <StyledLoader size={20} />
            </SidebarContentLoader>
          ) : (
            <SidebarContentList>
              {chats &&
                chats.data.length > 0 &&
                chats.data.map((item, index) => (
                  <SidebarMenuItem
                    key={index}
                    chat={item}
                    path={`/chat/${item.id}`}
                    isActive={location.pathname.includes(item.id)}
                    isPending={isPendingId === item.id}
                    onDelete={() => handleDelete(item.id)}
                  />
                ))}
            </SidebarContentList>
          )}
        </SidebarContent>
        <LogoutButton />
      </SidebarContainer>
    </SidebarWrapper>
  );
};
