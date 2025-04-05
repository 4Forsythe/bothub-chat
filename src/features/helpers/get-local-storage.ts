/**
 * RTK не позволяет использовать внутри слайсов хуки, поэтому пришлось написать эту утилиту, которая чисто достает данные из localStorage.
 *
 * @param key Ключ, по которому извлекается значение.
 * @returns Значение из localStorage, приведенное к типу T, или null, если такого значения нет.
 * @template T Тип данных, который ожидается в localStorage.
 */

export const getLocalStorage = <T>(key: string): T | null => {
  const value = localStorage.getItem(key);
  return value ? (JSON.parse(value) as T) : null;
};
