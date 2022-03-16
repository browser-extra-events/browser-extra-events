<script lang="ts">
  import screenchange from "./eventlisteners/screenchange.svelte";
  import viewportmove from "./eventlisteners/viewportmove.svelte";
  import windowmove from "./eventlisteners/windowmove.svelte";
  import zoomchange from "./eventlisteners/zoomchange.svelte";

  import EventToggle from "./EventToggle.svelte";
</script>

<main>
  <h1>@browser-extra-events/example</h1>

  <div class="container">
    <EventToggle component={windowmove} label="windowmove" />
    <EventToggle component={screenchange} label="screenchange" />
    <EventToggle component={zoomchange} label="zoomchange" />
    <EventToggle component={viewportmove} label="viewportmove" />
  </div>
</main>

<style>
	main {
		max-width: 320px;
		margin: 0 auto;
    text-align: center;
	}

  .container {
    text-align: left;
  }

	h1 {
		color: #ff3e00;
		font-size: larger;
		font-weight: 500;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>