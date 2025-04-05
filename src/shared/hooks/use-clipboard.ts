import React from 'react';

type CopyState = 'ready' | 'success' | Error;

/**
 * Базовый хук для работы с буфером обмена. Позволяет копировать текст в буфер обмена.
 * и отслеживать состояния.
 *
 * @param delay Время задержки перед возвратом готового состояния после копирования.
 *              По умолчанию 2500 мс (2.5 секунды).
 *
 * @returns Объект с состоянием текущей операции и функцией для копирования текста в буфер обмена.
 *          - `state`: Текущее состояние копирования ('ready', 'success' или ошибка).
 *          - `copy`: Функция, которая принимает строку и копирует её в буфер обмена.
 */

export const useClipboard = ({ delay = 2500 } = {}) => {
  const [state, setState] = React.useState<CopyState>('ready');
  const [copyTimeout, setCopyTimeout] =
    React.useState<ReturnType<typeof setTimeout>>();

  function handleCopyToClipboard(result: CopyState) {
    setState(result);
    clearTimeout(copyTimeout);
    setCopyTimeout(setTimeout(() => setState('ready'), delay));
  }

  function copy(value: string) {
    if ('clipboard' in navigator) {
      navigator.clipboard
        .writeText(value)
        .then(() => handleCopyToClipboard('success'))
        .catch(
          (error) => error instanceof Error && handleCopyToClipboard(error)
        );
    } else {
      handleCopyToClipboard(
        new Error('`useClipboard`: Navigation Clipboard is not supported')
      );
    }
  }

  return { state, copy };
};
