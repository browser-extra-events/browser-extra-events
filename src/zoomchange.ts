/**
 * @author Rostyslav Bohomaz
 * @copyright 2022 Rostyslav Bohomaz. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
export {};

declare global {
  interface Window {
    onzoom: ((this: GlobalEventHandlers, ev: UIEvent) => any)
      & ((this: Window, ev: UIEvent) => any) | null;
  }

  interface WindowEventMap {
    "zoom": UIEvent
  }

  interface Screen {
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
let devicePixelRatio: number = window.devicePixelRatio;

let listener: typeof window.onzoom = null;

function update() {
  if (devicePixelRatio != window.devicePixelRatio) {
    devicePixelRatio = window.devicePixelRatio;

    if ((
      availTop == screen.availTop &&
      availLeft == screen.availLeft &&
      width == screen.width &&
      height == screen.height &&
      colorDepth == screen.colorDepth &&
      pixelDepth == screen.pixelDepth
    )) {
      window.dispatchEvent(new UIEvent("zoom"));
    } else {
      availTop = screen.availTop;
      availLeft = screen.availLeft;
      width = screen.width;
      height = screen.height;
      colorDepth = screen.colorDepth;
      pixelDepth = screen.pixelDepth;
    }
  }
}

if (!Reflect.has(window, "onzoom")) {
  Object.defineProperty(window, "onzoom", {
    get() {
      return listener;
    },
    set(value: typeof listener) {
      if (typeof value == "function") {
        listener && window.removeEventListener("zoom", listener);
        listener = value;
        window.addEventListener("zoom", listener);
      } else if (!value && listener) {
        window.removeEventListener("zoom", listener);
        listener = null;
      }
    }
  });
  
  window.addEventListener("resize", update);
}
