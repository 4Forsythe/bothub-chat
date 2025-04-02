import React from 'react';
import styled from 'styled-components';

import { Chat, Sidebar } from '@/shared/components';

const DashboardWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;
  gap: 16px;
  padding: 16px;
  display: grid;
  grid-template-columns: 324px auto;
`;

export function DashboardPage(): React.JSX.Element {
  return (
    <DashboardWrapper>
      <Sidebar />
      <Chat />
    </DashboardWrapper>
  );
}
