export {};

declare global {
  interface Window {
    onscreenchange: ((this: GlobalEventHandlers, ev: Event) => any)
      & ((this: Window, ev: Event) => any) | null;
  }

  interface WindowEventMap {
    "screenchange": Event
  }
}

let width: number = screen.width;
let height: number = screen.height;
let availWidth: number = screen.availWidth;
let availHeight: number = screen.availHeight;
let colorDepth: number = screen.colorDepth;
let pixelDepth: number = screen.pixelDepth;
let devicePixelRatio: number = window.devicePixelRatio;

let listener: typeof window.onscreenchange = null;

function update() {
  if (
      width != screen.width ||
      height != screen.height ||
      availWidth != screen.availWidth ||
      availHeight != screen.availHeight ||
      colorDepth != screen.colorDepth ||
      pixelDepth != screen.pixelDepth ||
      devicePixelRatio != window.devicePixelRatio
  ) {
    width = screen.width;
    height = screen.height;
    availWidth = screen.availWidth;
    availHeight = screen.availHeight;
    colorDepth = screen.colorDepth;
    pixelDepth = screen.pixelDepth;
    devicePixelRatio = window.devicePixelRatio;

    window.dispatchEvent(new Event("screenchange"));
  }
  window.requestAnimationFrame(update);
}

if (!Reflect.has(window, "onscreenchange")) {
  Object.defineProperty(window, "onscreenchange", {
    get() {
      return listener;
    },
    set(value: typeof listener) {
      if (typeof value == "function") {
        listener && window.removeEventListener("screenchange", listener);
        listener = value;
        window.addEventListener("screenchange", listener);
      } else if (!value && listener) {
        window.removeEventListener("screenchange", listener);
        listener = null;
      }
    }
  });
  window.requestAnimationFrame(update);
}
