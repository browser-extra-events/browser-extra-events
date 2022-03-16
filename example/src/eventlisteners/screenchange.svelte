<script lang="ts">
  import  "@browser-extra-events/screenchange";

  import { onMount, onDestroy } from "svelte";
  
  onMount(() => screen.addEventListener("change", onscreenchange));
  onDestroy(() => screen.removeEventListener("change", onscreenchange));

  function onscreenchange(event: UIEvent) {
    console.info("%cscreen", "color:black;background:orange", {
      timeStamp: event.timeStamp,
      type: event.type,
    }, {
      width: screen.width,
      height: screen.height,
      availTop: screen.availTop,
      availLeft: screen.availLeft,
      colorDepth: screen.colorDepth,
      pixelDepth: screen.pixelDepth,
    });
  }
</script>

