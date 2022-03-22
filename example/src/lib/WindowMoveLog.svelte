<script lang="ts">
  import "browser-extra-events/windowmove";
  import type {} from "browser-extra-events/types/windowmove";

  import { onMount, onDestroy } from "svelte";
  
  onMount(() => window.addEventListener("move", onwindowmove));
  onDestroy(() => window.removeEventListener("move", onwindowmove));

  function onwindowmove(event: UIEvent) {
    console.info("%cwindow", "color:white;background:blue", {
      timeStamp: event.timeStamp,
      type: event.type,
    }, {
      screenX: window.screenX,
      screenY: window.screenY
    });
  }
</script>

