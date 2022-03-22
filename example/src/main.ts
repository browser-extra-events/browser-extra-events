import 'browser-extra-events/windowmove';
import 'browser-extra-events/zoomchange';
import 'browser-extra-events/screenchange';
import 'browser-extra-events/viewportmove';

import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')
})

export default app
