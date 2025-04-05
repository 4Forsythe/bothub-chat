import React from 'react';
import styled from 'styled-components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import { Middleware } from './middleware';
import { DashboardLayout } from '@/layouts';
import { AuthPage, ChatPage, HomePage } from '@/pages';
import { NotFound } from '@/shared/components';

const AppWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFound />, // Страница 404
  },
  {
    path: '/auth',
    element: <AuthPage />, // Страница авторизации
  },
  {
    path: '/',
    element: (
      <Middleware>
        <DashboardLayout />
      </Middleware>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />, // Главная страница (новый чат)
      },
      {
        path: 'chat/:id',
        element: <ChatPage />, // Вложенная страница чата с динамическим параметром id
      },
    ],
  },
]);

export const App: React.FC = () => {
  return (
    <React.Fragment>
      <Toaster position='top-center' expand={false} richColors />
      <AppWrapper>
        <RouterProvider router={router} />
      </AppWrapper>
    </React.Fragment>
  );
};
