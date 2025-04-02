import React from 'react';
import styled from 'styled-components';

import { Selector } from '@/shared/ui';
import { ChatInput } from '@/shared/components';
import { mockChatFormModels } from '@/shared/mocks';

const ChatFormWrapper = styled.div`
  gap: 14px;
  display: flex;
  flex-direction: column;
`;

export const ChatForm: React.FC = () => {
  const [targetModel, setTargetModel] = React.useState(0);

  return (
    <ChatFormWrapper>
      <Selector
        direction='up'
        values={mockChatFormModels}
        targetIndex={targetModel}
        onChange={(index) => setTargetModel(index)}
      >
        {mockChatFormModels[targetModel]}
      </Selector>
      <ChatInput />
    </ChatFormWrapper>
  );
};
