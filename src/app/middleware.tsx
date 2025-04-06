import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from './redux';
import { selectAuth } from '@/entities/auth';

interface Props {
  children: React.ReactNode;
}

export function Middleware({ children }: Props): React.JSX.Element | null {
  const navigate = useNavigate();
  const { user, isSigned } = useAppSelector(selectAuth);

  React.useEffect(() => {
    if (!isSigned) {
      navigate('/auth', { replace: true });
    }
  }, [user, navigate]);

  if (!isSigned) return null;

  return <React.Fragment>{children}</React.Fragment>;
}
