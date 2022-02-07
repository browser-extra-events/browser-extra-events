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
    onchange: ((this: Screen, ev: Event) => any) | null;
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
}

let width: number = screen.width;
let height: number = screen.height;
let availWidth: number = screen.availWidth;
let availHeight: number = screen.availHeight;
let colorDepth: number = screen.colorDepth;
let pixelDepth: number = screen.pixelDepth;
let devicePixelRatio: number = window.devicePixelRatio;

let listener: typeof screen.onchange = null;

function update() {
  if (!document.fullscreenElement && (
      width != screen.width ||
      height != screen.height ||
      availWidth != screen.availWidth ||
      availHeight != screen.availHeight ||
      colorDepth != screen.colorDepth ||
      pixelDepth != screen.pixelDepth ||
      devicePixelRatio != window.devicePixelRatio
    )) {
    width = screen.width;
    height = screen.height;
    availWidth = screen.availWidth;
    availHeight = screen.availHeight;
    colorDepth = screen.colorDepth;
    pixelDepth = screen.pixelDepth;
    devicePixelRatio = window.devicePixelRatio;

    screen.dispatchEvent(new Event("change"));
  }
  window.requestAnimationFrame(update);
}

if (!Reflect.has(screen, "onchange")) {

  if (!Reflect.has(screen, "dispatchEvent")) {
    const listeners: Map<keyof ScreenEventMap, ((this: Screen, ev: Event) => any)[]> = new Map();
    const prototype = Object.getPrototypeOf(screen);

    prototype.addEventListener = function(
      type: keyof ScreenEventMap,
      listener: (this: Screen, ev: Event) => any,
    ): void {
      if (typeof listener != "function") return;
      if (!listeners.has(type)) listeners.set(type, []);
      (listeners.get(type) as ((this: Screen, ev: Event) => any)[]).push(listener);
    }

    prototype.removeEventListener = function(
      type: keyof ScreenEventMap,
      listener: (this: Screen, ev: Event) => any,
    ): void {
      if (typeof listener != "function") return;
      const stack = listeners.get(type);
      if (!stack) return;

      for (let i = 0, l = stack.length; i < l; i++) {
        if (stack[i] === listener) {
          stack.splice(i, 1);
          return;
        }
      }
    }

    prototype.dispatchEvent = function(event: Event): boolean {
      const type = event.type as keyof ScreenEventMap;
      if (!listeners.has(type)) return false;

      const stack = listeners.get(type) as ((this: Screen, ev: Event) => any)[];
      // @ts-ignore
      const _event: Event = {
        isTrusted: false,
        currentTarget: screen,
        eventPhase: Event.AT_TARGET,
        target: screen,
        timeStamp: event.timeStamp,
        type: event.type,
      };

      for (let i = 0, l = stack.length; i < l; i++) {
        try {
          stack[i].call(screen, _event);
        } catch (error) {
          setTimeout(() => { throw error });
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
