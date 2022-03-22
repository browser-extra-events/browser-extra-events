<script lang="ts">
  import ScreenChangeLog from "./lib/ScreenChangeLog.svelte";
  import ViewportMoveLog from "./lib/ViewportMoveLog.svelte";
  import WindowMoveLog from "./lib/WindowMoveLog.svelte";
  import ZoomChangeLog from "./lib/ZoomChangeLog.svelte";

  import ComponentToggle from "./lib/ComponentToggle.svelte";
</script>

<main>
  <h1>@browser-extra-events/example</h1>

  <div class="container">
    <ComponentToggle component={WindowMoveLog} label="windowmove" />
    <ComponentToggle component={ScreenChangeLog} label="screenchange" />
    <ComponentToggle component={ZoomChangeLog} label="zoomchange" />
    <ComponentToggle component={ViewportMoveLog} label="viewportmove" />
  </div>
</main>

<style>
  :global(body) {
    font-family: Arial, Helvetica, sans-serif;
  }

	h1 {
		color: #ff3e00;
		font-size: larger;
		font-weight: 500;
	}
	main {
		max-width: 320px;
		margin: 0 auto;
    text-align: center;
	}

  .container {
    text-align: left;
  }
</style>