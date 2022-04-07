export function ensureArray<T = any>(maybeArray: T[] | T): T[] {
  if (Array.isArray(maybeArray)) {
    return maybeArray;
  }

  return new Array(maybeArray);
}
