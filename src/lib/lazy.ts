const LAZY_UNINIT = {};

export function lazy<R>(init: () => R): () => R {
  let value: R = LAZY_UNINIT as never;
  return () => {
    if (value === LAZY_UNINIT) {
      value = init();
    }
    return value;
  }
}
