import React from 'react';

/**
 * Базовый хук для работы с localStorage. Позволяет использовать локальный стейт для извлечения/установки значений.
 *
 * @param key Ключ, по которому будет сохраняться или извлекаться значение.
 * @returns Массив из текущего состояния и функции для его обновления.
 *          state - текущее значение, извлеченное из localStorage или null, если данных нет.
 *          setValue - функция для обновления значения в localStorage и состоянии.
 * @template T Тип данных, который хранится в localStorage. Может быть любым.
 */

export const useLocalStorage = <T>(key: string) => {
  const [state, setState] = React.useState<T | null>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  });

  const setValue = (value: T | null) => {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
    setState(value);
  };

  return [state, setValue] as const;
};
