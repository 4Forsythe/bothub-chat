import React from 'react';

import { Avatar } from '@/shared/ui';

const models = [
  {
    name: 'ChatGTP',
    icon: 'gpt.svg',
  },
  {
    name: 'DALL-E',
    icon: 'dall-e.svg',
  },
  {
    name: 'Midjourney',
    icon: 'mj-white.svg',
  },
];

export const mockChatFormModels = models.map((model, index) => {
  return (
    <React.Fragment key={index}>
      <Avatar url={`/icons/ai-models/${model.icon}`} size='sm' />
      <span>{model.name}</span>
    </React.Fragment>
  );
});
