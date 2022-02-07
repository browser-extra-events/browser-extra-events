import "@browser-extra-events/windowmove";
import "@browser-extra-events/viewportmove";
import "@browser-extra-events/screenchange";

window.addEventListener("move", function(event) {
  console.info("%cwindow", "color:white;background:blue", {
    timeStamp: event.timeStamp,
    type: event.type,
  }, {
    screenX: window.screenX,
    screenY: window.screenY
  });
});

screen.addEventListener("change", function(event) {
  console.info("%cscreen", "color:black;background:orange", {
    timeStamp: event.timeStamp,
    type: event.type,
  }, {
    width: screen.width,
    height: screen.height,
    pixelRatio: window.devicePixelRatio,
    colorDepth: screen.colorDepth,
    pixelDepth: screen.pixelDepth,
  });
});

visualViewport.addEventListener("move", function(event) {
  console.log("%cviewport", "color:black;background:gray", {
    timeStamp: event.timeStamp,
    type: event.type,
  }, {
    offsetX: visualViewport.offsetX,
    offsetY: visualViewport.offsetY,
  });
});
