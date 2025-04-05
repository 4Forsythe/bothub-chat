import React from 'react';
import styled from 'styled-components';
import { Lock } from 'lucide-react';

import { Avatar } from '@/shared/ui';
import { modelIcons } from '@/shared/constants';

import type { ModelType } from '@/entities/model';

const ModelItemWrapper = styled.div`
  gap: 10px;
  width: 100%;
  flex: 1;
  flex-grow: 1;
  flex-shrink: 0;
  height: fit-content;
  display: flex;
  align-items: center;
`;

const StyledAvatar = styled(Avatar)`
  width: 100%;
  flex-grow: 1;
  flex-shrink: 0;
`;

const ModelItemInner = styled.div`
  width: 100%;
  position: relative;
`;

const ModelItemLabel = styled.span`
  font-size: 15px;
  fonw-weight: 500;
`;

const ModelItemNotAllowed = styled.div`
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: rgba(var(--muted-color), 0.8);
  position: absolute;
`;

export const ModelItem: React.FC<ModelType> = ({
  id,
  label,
  message_color,
  allowed_plan_type,
}) => {
  /* Векторные иконки для всех ваших моделей было искать лень, поэтому сделал вот так 😂 */
  const iconFile = modelIcons.includes(`${id}.svg`)
    ? `/icons/ai-models/${id}.svg`
    : undefined;

  return (
    <ModelItemWrapper>
      <StyledAvatar
        size='sm'
        url={iconFile}
        backgroundColor={message_color ?? undefined}
      >
        {iconFile ? undefined : id.slice(0, 1)}
      </StyledAvatar>
      <ModelItemInner>
        <ModelItemLabel>{label}</ModelItemLabel>
        {allowed_plan_type !== null && allowed_plan_type !== 'FREE' && (
          <ModelItemNotAllowed>
            <Lock size={16} />
          </ModelItemNotAllowed>
        )}
      </ModelItemInner>
    </ModelItemWrapper>
  );
};
