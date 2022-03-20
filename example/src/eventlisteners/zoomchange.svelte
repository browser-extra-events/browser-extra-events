<script lang="ts">
  import "browser-extra-events/zoomchange";
  import type {} from "browser-extra-events/types/zoomchange";

  import { onMount, onDestroy } from "svelte";
  
  onMount(() => window.addEventListener("zoom", onzoomchange));
  onDestroy(() => window.removeEventListener("zoom", onzoomchange));

  function onzoomchange(event: UIEvent) {
    console.info("%cwindow", "color:white;background:blue", {
      timeStamp: event.timeStamp,
      type: event.type,
    }, {
      devicePixelRatio: window.devicePixelRatio,
    });
  }
</script>

