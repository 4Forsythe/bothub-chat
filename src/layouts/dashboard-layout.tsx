import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import { Sidebar } from '@/shared/components';

const DashboardWrapper = styled.div`
  gap: 16px;
  width: 100%;
  height: 100vh;
  padding: 16px;
  display: grid;
  grid-template-columns: 324px auto;
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    grid-template-columns: auto;
  }
  @media (max-width: 480px) {
    padding: 0;
  }
`;

export function DashboardLayout(): React.JSX.Element {
  return (
    <DashboardWrapper>
      <Sidebar />
      <Outlet />
    </DashboardWrapper>
  );
}
