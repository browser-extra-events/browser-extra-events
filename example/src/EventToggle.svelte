<script lang="ts">
  export let component: any;
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