import React from 'react';

type CopyState = 'ready' | 'success' | Error;

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
