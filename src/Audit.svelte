<script>
  export let events;

  const formatTimestamp = timestamp =>
    new Date(timestamp / 1000 / 1000).toLocaleString('en-gb', {
      hour12: false,
      timeZone: 'UTC',
      timeZoneName: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
</script>

<style>
  table {
    font-size: 12px;
  }
  .space {
    padding-right: 1rem;
  }
  .wrap {
    word-break: break-all;
  }
  td.break {
    height: 1rem;
  }
</style>

{#each events as { action, from, to, signer, timestamp }, i }
<div class="verification-result">
  <div class="field">
  <span class="title">Action:</span>
  {action} {#if from}from {from}{/if} {#if to}to {to}{/if}
  </div>

  <div class="field">
  <span class="title">Signed by:</span>
  {signer}
  </div>

  <div class="field">
  <span class="title">Date:</span>
  {formatTimestamp(timestamp)}
  </div>
</div>
{/each}
