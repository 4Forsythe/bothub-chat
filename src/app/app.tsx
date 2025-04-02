import React from 'react';
import styled from 'styled-components';

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

import { AuthPage, DashboardPage } from '@/pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Navigate to='/auth' replace />
    ) /* Базовый редирект на стр. авторизации */,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
]);

const AppWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const App: React.FC = () => {
  return (
    <AppWrapper>
      <RouterProvider router={router} />
    </AppWrapper>
  );
};
