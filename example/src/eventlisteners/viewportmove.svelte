<script lang="ts">
  import  "@browser-extra-events/viewportmove";

  import { onMount, onDestroy } from "svelte";
  
  onMount(() => visualViewport.addEventListener("move", onviewportmove));
  onDestroy(() => visualViewport.removeEventListener("move", onviewportmove));

  function onviewportmove(event: UIEvent) {
    console.log("%cviewport", "color:black;background:gray", {
      timeStamp: event.timeStamp,
      type: event.type,
    }, {
      offsetX: visualViewport.offsetX,
      offsetY: visualViewport.offsetY,
    });
  }
</script>

