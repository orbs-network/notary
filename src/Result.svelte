<script>
  export let result;

  const txToPrismUrl = (tx) => {
    return `${process.env.ORBS_PRISM_URL}/vchains/${process.env.ORBS_VCHAIN}/tx/${tx}`;
  };

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


<div class="verification-result">
  <div class="field">
  <span class="title">Document description:</span>
  {result.metadata}
  </div>

  <div class="field">
  <span class="title">Content hash:</span>
  {result.hash}
  </div>

  <div class="field">
  <span class="title">Signed by:</span>
  {result.signer}
  </div>

  <div class="field">
  <span class="title">Registered on:</span>
  {formatTimestamp(result.timestamp)}
  </div>

  <div class="field">
  <span class="title">Status:</span>
  {result.status}
  </div>
</div>

<!--<table>
  <tr>
    <td class="space">Content hash:</td>
    <td class="wrap">{result.hash}</td>
  </tr>

  {#if result.txId}
    <tr>
      <td class="space">Tx hash:</td>
      <td class="wrap">
      <a href="{txToPrismUrl(result.txId)}" target="_blank">{result.txId}</a>
      </td>
    </tr>
  {/if}

  {#if result.timestamp !== 0}
    <tr>
      <td class="space">Signed by:</td>
      <td class="wrap">{result.signer}</td>
    </tr>
    <tr>
      <td class="space">Registered on:</td>
      <td>{formatTimestamp(result.timestamp)}</td>
    </tr>
    <tr>
      <td class="space">Metadata:</td>
      <td>
      {#if result.verified}
      {result.metadata}
      {:else}
      Encrypted
      {/if}
      </td>
    </tr>
  {/if}

  <tr>
    <td>Status:</td>
    <td>{result.timestamp !== 0 ? result.status : ''}</td>
  </tr>

</table>-->
