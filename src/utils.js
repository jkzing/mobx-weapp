export function assert(condition, message) {
  if (!condition) throw new Error(message);
}

export function warning(condition, message) {
  if (!condition) {
    console.warn(`[mobx-weapp]: ${message}`);
  }
}