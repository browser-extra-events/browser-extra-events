/**
 * @author Rostyslav Bohomaz
 * @copyright 2022 Rostyslav Bohomaz. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
export {};

import extendEventTarget from "extend-event-target";

declare global {
  interface ScreenEventMap {
    "change": UIEvent
  }

  interface Screen extends EventTarget {
    addEventListener<T extends keyof ScreenEventMap>(
      type: T,
      listener: typeof screen.onchange,
    ): void;
    removeEventListener<T extends keyof ScreenEventMap>(
      type: T,
      listener: typeof screen.onchange,
    ): void;
    dispatchEvent(event: Event): boolean;
  }

  interface Screen {
    onchange: ((this: Screen, ev: UIEvent) => any) | null;
    availLeft: number;
    availTop: number;
  }
}

let availLeft: number = screen.availLeft;
let availTop: number = screen.availTop;
let width: number = screen.width;
let height: number = screen.height;
let colorDepth: number = screen.colorDepth;
let pixelDepth: number = screen.pixelDepth;

let listener: typeof screen.onchange = null;

function update() {
  if ((
      availTop != screen.availTop ||
      availLeft != screen.availLeft ||
      width != screen.width ||
      height != screen.height ||
      colorDepth != screen.colorDepth ||
      pixelDepth != screen.pixelDepth
    )) {
    availTop = screen.availTop;
    availLeft = screen.availLeft;
    width = screen.width;
    height = screen.height;
    colorDepth = screen.colorDepth;
    pixelDepth = screen.pixelDepth;

    screen.dispatchEvent(new Event("change"));
  }
  window.requestAnimationFrame(update);
}

if (!Reflect.has(screen, "onchange")) {

  if (!Reflect.has(screen, "dispatchEvent")) {
    extendEventTarget(screen);
  }

  Object.defineProperty(screen, "onchange", {
    get() {
      return listener;
    },
    set(value: typeof listener) {
      if (typeof value == "function") {
        listener && screen.removeEventListener("change", listener);
        listener = value;
        screen.addEventListener("change", listener);
      } else if (!value && listener) {
        screen.removeEventListener("change", listener);
        listener = null;
      }
    }
  });
  window.requestAnimationFrame(update);
}
