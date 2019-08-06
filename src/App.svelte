<script>
  import Input from './Input.svelte';
  import Error from './Error.svelte';
  import Result from './Result.svelte';
  import Explanations from './Explanations.svelte';
  import Audit from './Audit.svelte';
  import Keys from './Keys.svelte';

  let file, metadata, error, results, events, status;
  let showChoiceScreen = true;
  let showRegister = false;
  let showVerify = false;

  export let actions;
  export let audit;
  export let sha256;
  export let txToPrismUrl;
  export let privateKey, address;

  const resetResults = () => {
    error = null;
    results = null;
    events = null;
    status = null;
  };

  const registerHandler = async () => {
    resetResults();
    try {
      const payload = await readFileFromBrowser(file);
      const res = await actions.register(payload, metadata || "");
      results = res;
      console.log(res);
      status = res.status;
      events = await audit.getEventsByHash(res.hash);
    } catch (err) {
      error = { message: err };
      console.error(err);
    }
  };

  const verifyHandler = async () => {
    resetResults();
    const payload = await readFileFromBrowser(file);
    const hash = sha256(payload);
    const res = await actions.verify(hash, payload);
    results = res;
    console.log(res);
    status = res.status;
    if (!res.verified) {
      error = {message: 'Not verified'};
    }

    events = await audit.getEventsByHash(hash);
  };

  const updateStatus = async () => {
    try {
      const payload = await readFileFromBrowser(file);
      const hash = sha256(payload);
      const res = await actions.updateStatus(hash, status);
      await verifyHandler();
    } catch (err) {
      error = { message: err };
      console.log(err);
    }
  };

  const readFileFromBrowser = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = ev => {
        resolve(ev.target.result);
      };
      reader.readAsBinaryString(file);
    });
  };

  const showRegisterHandler = () => {
    showChoiceScreen = false;
    showRegister = true;
  }

  const showVerifyHandler = () => {
    showChoiceScreen = false;
    showVerify = true;
  }
</script>

<style>
  .container {
    margin: 1rem;
    display: flex;
    flex-direction: column;
  }
  .actions {
    width: 100%;
    max-width: 400px;
    display: flex;
    justify-content: space-between;
  }
  .actions button {
    width: 49%;
  }
</style>

{#if showChoiceScreen}
<div class="action-container register" on:click={showRegisterHandler}>
<div class="action-cell">Register</div>
</div>

<div class="action-container verify" on:click={showVerifyHandler}>
<span class="action-cell">Verify</span>
</div>
{:else if showRegister}
<div class="header">
<img src="./orbs.svg"/><img src="./orbs-text.svg"/>
</div>

<div class="content">
</div>
{:else if showVerify}}
verify
{/if}


<!--
<div class="container">
  <h1>Orbs Notary</h1>
  <Keys privateKey={privateKey} address={address}/>
  <Explanations />
  <Input
    on:change={ev => {
      if (ev.detail.file) {
        file = ev.detail.file;
        resetResults();
      }

      if (ev.detail.metadata) {
        metadata = ev.detail.metadata;
      }

      if (ev.detail.status) {
        status = ev.detail.status;
      }
    }}
    actions={actions}
    status={status}
  />
  <div class="actions">
    <button disabled={!file} on:click={registerHandler}>Register</button>
    <button disabled={!file} on:click={verifyHandler}>Verify</button>
    {#if status}
    <button disabled={!file} on:click={updateStatus}>Update</button>
    {/if}
  </div>
  {#if error}
    <Error {error} />
  {/if}
  {#if results}
    <Result result={results} />
  {/if}

  {#if events}
    <Audit events={events} />
  {/if}
</div>
-->
