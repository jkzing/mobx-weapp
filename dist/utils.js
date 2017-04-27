"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assert = assert;
exports.warning = warning;
function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function warning(condition, message) {
  if (!condition) {
    console.warn("[mobx-weapp]: " + message);
  }
}