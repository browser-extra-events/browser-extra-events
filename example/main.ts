import "@browser-extra-events/windowmove";
import "@browser-extra-events/viewportmove";
import "@browser-extra-events/screenchange";

function onwindowmove(this: Window | GlobalEventHandlers, event: Event) {
  console.log(this, event.type, {
    screenX: window.screenX,
    screenY: window.screenY
  });
}

function onviewportmove(this: VisualViewport, event: Event) {
  console.log(this, event.type, {
    offsetX: visualViewport.offsetX,
    offsetY: visualViewport.offsetY,
  });
}

function onscreenchange(this: Screen, event: Event) {
  console.log(this, event.type);
}

// window.addEventListener("move", onwindowmove);
// screen.addEventListener("change", onscreenchange);
// visualViewport.addEventListener("move", onviewportmove);

window.onmove = onwindowmove;
screen.onchange = onscreenchange;
visualViewport.onmove = onviewportmove;
