export function assert(condition, message) {
  /* istanbul ignore else */
  if (!condition) throw new Error(message);
}

export function warning(condition, message) {
  /* istanbul ignore else */
  if (!condition) {
    console.warn(`[mobx-weapp]: ${message}`);
  }
}