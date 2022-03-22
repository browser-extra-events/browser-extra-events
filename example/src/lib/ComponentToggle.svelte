<script lang="ts">
  import type { SvelteComponent } from "svelte";

  export let component: typeof SvelteComponent;
  export let label: string;

  let checked: boolean = true;
</script>

<label>
  <input type="checkbox" bind:checked={checked}>
  {label}
</label>

{#if checked}
  <svelte:component this={component} />
{/if}

<style>
  label {
    display: block;
  }
</style>