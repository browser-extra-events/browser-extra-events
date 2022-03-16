/**
 * @author Rostyslav Bohomaz
 * @copyright 2022 Rostyslav Bohomaz. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
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

const threshold: number = 9;

let listener: typeof visualViewport.onmove = null;

function update(offsetX: number, offsetY: number) {
  const diffX = offsetX - (visualViewport.offsetX as number);
  const diffY = offsetY - (visualViewport.offsetY as number);

  if (Math.abs(diffX) > 1 || Math.abs(diffY) > 1) {
    visualViewport.offsetX = offsetX;
    visualViewport.offsetY = offsetY;

    visualViewport.dispatchEvent(new Event("move"));
  }
}

function onmouseevent(event: MouseEvent) {
  if (event.isTrusted) {
    // NOTE:
    // Limitations:
    // 1. page zoom should be 100%;
    // 2. window should be on the main screen
    const offsetX = Math.max(event.screenX - window.screenX - event.clientX, 0);
    const offsetY = Math.max(event.screenY - window.screenY - event.clientY, 0);
    update(offsetX < threshold ? 0 : offsetX, offsetY);
  }
}

function onresize() {
  if (visualViewport.height == screen.height) {
    update(visualViewport.offsetX as number, 0);
  } else if (visualViewport.width == screen.width) {
    update(0, visualViewport.offsetY as number);
  } else {
    document.addEventListener("mousemove", onmouseevent, { once: true });
  }
}

if (!Reflect.has(visualViewport, "onmove")) {
  visualViewport.offsetX = 0;
  visualViewport.offsetY = 0;

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

  document.addEventListener("mousemove", onmouseevent, { once: true });

  document.addEventListener("mouseover", onmouseevent);
  window.addEventListener("resize", onresize);
}
