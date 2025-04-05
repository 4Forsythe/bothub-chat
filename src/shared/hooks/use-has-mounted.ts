import React from 'react';

/**
 * Обычный хук, который отслеживает состояние первого рендера компонента.
 *
 * @param deps Массив зависимостей React.DelepndencyList. По умолчанию пустой.
 * @returns Булевое значение состояния первичного рендера.
 */

export const useHasMounted = (deps: React.DependencyList = []) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, [...deps]);

  return isMounted;
};
