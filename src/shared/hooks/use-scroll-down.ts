import React from 'react';

/**
 * Обычный хук, который нужен для скролла в самый низ контейнера при наличии изменений в зависимостях.
 *
 * @param deps Массив зависимостей React.DelepndencyList. По умолчанию пустой.
 * @returns Переменную React.RefObject, которую можно указать в качестве ref-пропа для компонента-контейнера.
 */

export const useScrollDown = (deps: React.DependencyList = []) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [...deps]);

  return ref;
};
