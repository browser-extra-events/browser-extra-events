/**
 * @author Rostyslav Bohomaz
 * @copyright 2022 Rostyslav Bohomaz. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
export {};

declare global {
  interface ScreenEventMap {
    "change": Event
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
    onchange: ((this: Screen, ev: Event) => any) | null;
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
    const listeners: Record<keyof ScreenEventMap, Array<(this: Screen, ev: Event) => any>> = {
      change: [],
    };
    const prototype = Object.getPrototypeOf(screen);

    prototype.addEventListener = function(
      type: keyof ScreenEventMap,
      listener: (this: Screen, ev: Event) => any,
    ): void {
      if (typeof listener != "function") return;
      const stack = listeners[type];
      if (stack) stack.push(listener);
    }

    prototype.removeEventListener = function(
      type: keyof ScreenEventMap,
      listener: (this: Screen, ev: Event) => any,
    ): void {
      if (typeof listener != "function") return;
      const stack = listeners[type];
      if (stack) {
        for (let i = 0, l = stack.length; i < l; i++) {
          if (stack[i] === listener) {
            stack.splice(i, 1);
            return;
          }
        }
      }
    }

    prototype.dispatchEvent = function(event: Event): boolean {
      const stack = listeners[event.type as keyof ScreenEventMap];
      if (stack) {
        // @ts-ignore
        const _event: Event = {
          isTrusted: false,
          type: event.type,
          timeStamp: event.timeStamp,
          eventPhase: Event.AT_TARGET,
          currentTarget: screen,
          target: screen,
          returnValue: true,
          // @ts-ignore
          [Symbol.toStringTag]: "Event",
        };

        for (let i = 0, l = stack.length; i < l; i++) {
          try {
            stack[i].call(screen, _event);
          } catch (error) {
            setTimeout(() => { throw error });
          }
        }
      }
      return true;
    }
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
