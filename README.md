# browser-extra-events

Additional events for browser.

```
npm install browser-extra-events
```

## Events

### `windowmove`

Fires `move` event on [`window`] each time [`window.screenX`] or [`window.screenY`] are changed.

![windowmove](./assets/windowmove.gif)

### `screenchange`

Polyfills [`EventTarget`] interface for [`screen`] and adds `change` event to it.
Fires `change` event if any property of [`screen`] is changed. It happens when browser window moves to another screen. 

![screenchange](./assets/screenchange.gif)

### `viewportmove`

Fires `move` event on [`visualViewport`] each time the client viewport changes its position relative to upper-left corner of the browser window.

> NOTE: It relies on mouse events, therefore to catch viewport reposition the user pointer (mouse) should be inside the client viewport. 

![viewportmove](./assets/viewportmove.gif)

### `zoomchange`

Fires `zoom` event on [`window`] each time user changes browser zoom ratio.

![zoomchange](./assets/zoomchange.gif)

## Typescript support

Add

```typescript
import type {} from "browser-extra-events/types/{EVENT_NAME}"
```

or
```typescript
/// <reference types="browser-extra-events/types/{EVENT_NAME}" />
```

where `EVENT_NAME` is one of `zoomchange`, `viewportmove`, `screenchange`, `windowmove`.



[`window`]: https://developer.mozilla.org/en-US/docs/Web/API/Window
[`visualViewport`]: https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport
[`EventTarget`]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
[`window.screenX`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/screenX
[`window.screenY`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/screenY
[`screen`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/screen
