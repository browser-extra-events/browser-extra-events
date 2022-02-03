export {};

declare global {
  interface VisualViewport {
    onmove: ((this: VisualViewport, ev: Event) => any) | null;
    offsetX: number;
    offsetY: number;
  }

  interface VisualViewportEventMap {
    "move": Event
  }
}

let offsetX: number = window.outerWidth - window.innerWidth;
let offsetY: number = window.outerHeight - window.innerHeight;

let listener: typeof visualViewport.onmove = null;

function update(event: MouseEvent) {
  offsetX = event.screenX - window.screenX - event.clientX;
  offsetY = event.screenY - window.screenY - event.clientY;

  const dx = offsetX - visualViewport.offsetX;
  const dy = offsetY - visualViewport.offsetY;

  if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
    visualViewport.offsetX = offsetX;
    visualViewport.offsetY = offsetY;
    visualViewport.dispatchEvent(new Event("move"));
  }
}

function onmouseevent(event: MouseEvent) {
  if (event.isTrusted) update(event);
}

if (!Reflect.has(visualViewport, "onmove")) {
  visualViewport.offsetX = offsetX;
  visualViewport.offsetY = offsetY;

  Object.defineProperty(visualViewport, "onmove", {
    get() {
      return listener;
    },
    set(value: typeof listener) {
      if (typeof value == "function") {
        listener && visualViewport.removeEventListener("move", listener);
        listener = value;
        visualViewport.addEventListener("move", listener);
      } else if (!value && listener) {
        visualViewport.removeEventListener("move", listener);
        listener = null;
      }
    }
  });

  window.addEventListener("mousemove", onmouseevent);
  window.addEventListener("click", onmouseevent);
}
