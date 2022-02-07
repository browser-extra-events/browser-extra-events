/**
 * @author Rostyslav Bohomaz
 * @copyright 2022 Rostyslav Bohomaz. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
export {};

declare global {
  interface Window {
    onmove: ((this: GlobalEventHandlers, ev: UIEvent) => any)
      & ((this: Window, ev: UIEvent) => any) | null;
  }

  interface WindowEventMap {
    "move": UIEvent
  }
}

let screenX = window.screenX;
let screenY = window.screenY;

let listener: typeof window.onmove = null;

function update() {
  const movementX = window.screenX - screenX;
  const movementY = window.screenY - screenY;

  if (movementX != 0 || movementY != 0) {
    screenX = window.screenX;
    screenY = window.screenY;

    const event = new UIEvent("move");

    window.dispatchEvent(event);
  }
  window.requestAnimationFrame(update);
}

if (!Reflect.has(window, "onmove")) {
  Object.defineProperty(window, "onmove", {
    get() {
      return listener;
    },
    set(value: typeof listener) {
      if (typeof value == "function") {
        listener && window.removeEventListener("move", listener);
        listener = value;
        window.addEventListener("move", listener);
      } else if (!value && listener) {
        window.removeEventListener("move", listener);
        listener = null;
      }
    }
  });
  window.requestAnimationFrame(update);
}
