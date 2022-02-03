import "@browser-extra-events/windowmove";
import "@browser-extra-events/viewportmove";
import "@browser-extra-events/screenchange";

function onwindowmove() {
  console.log("windowmove", {
    screenX: window.screenX,
    screenY: window.screenY
  });
}

function onviewportmove() {
  console.log("viewportmove", {
    offsetX: visualViewport.offsetX,
    offsetY: visualViewport.offsetY,
  });
}

function onscreenchange() {
  console.log("screenchange", screen);
}

// window.addEventListener("move", onwindowmove);
// window.addEventListener("screenchange", onscreenchange);
// visualViewport.addEventListener("move", onviewportmove);

window.onmove = onwindowmove;
window.onscreenchange = onscreenchange;
visualViewport.onmove = onviewportmove;
