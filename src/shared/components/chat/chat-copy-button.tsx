import React from 'react';
import styled from 'styled-components';
import { Copy, Check } from 'lucide-react';

import { useClipboard } from '@/shared/hooks';

const ChatCopyButtonWrapper = styled.button`
  color: rgb(var(--muted-foreground-color));
  transition: transform 250ms ease, color 250ms ease;

  &:hover {
    opacity: 1;
    transform: scale(1.2);
  }

  &:active {
    transform: scale(1);
  }
`;

interface Props {
  value: string;
}

export const ChatCopyButton: React.FC<Props> = ({ value }) => {
  const { state, copy } = useClipboard({ delay: 5000 });

  return (
    <ChatCopyButtonWrapper onClick={() => copy(value)}>
      {state === 'ready' && <Copy size={16} />}
      {state === 'success' && <Check size={16} />}
    </ChatCopyButtonWrapper>
  );
};
