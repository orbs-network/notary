<script>
  import Input from './Input.svelte';
  import Error from './Error.svelte';
  import Result from './Result.svelte';
  import Explanations from './Explanations.svelte';
  import Audit from './Audit.svelte';
  import Keys from './Keys.svelte';
	import { onMount } from 'svelte';

  let file, metadata, error, results, events, status;
  let showChoiceScreen = true;
  let showRegister = false;
  let showVerify = false;
  let isDragOver = false;

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

  const resetShowHandlers = () => {
    showChoiceScreen = false;
    showRegister = false;
    showVerify = false;
  }

  const showRegisterHandler = () => {
    resetShowHandlers();
    resetResults();
    showRegister = true;
    file = undefined;
  }

  const showVerifyHandler = () => {
    resetShowHandlers();
    resetResults();
    showVerify = true;
    file = undefined;
  }

  const showChoiceScreenHandler = () => {
    resetShowHandlers();
    resetResults();
    showChoiceScreen = true;
    file = undefined;
  }

  const allowDrop = (e) => {
    console.log(e);
    e.preventDefault();
  }

  const drop = (e) => {
    e.preventDefault();
    console.log(e)
    if (!e.dataTransfer) {
      return;
    }

    const [ item ] = e.dataTransfer.items;
    if (item && item.kind === 'file') {
      console.log(item)
      console.log(item.getAsFile())
    }
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

  .isDragOver {
    opacity: 0.7;
    border: 1px dashed black;
  }

  button {
    border-radius: 30px;
    background-color: #536696;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    object-fit: contain;
    font-family: Montserrat;
    font-size: 12px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 2.17;
    letter-spacing: 0.19px;
    color: #ffffff;
  }

  .actions {
    text-align: center;
  }
</style>

{#if showChoiceScreen}
<div class="action-container register" on:click={showRegisterHandler}>
<div class="action-cell">Register</div>
</div>

<div class="action-container verify" on:click={showVerifyHandler}>
<span class="action-cell">Verify</span>
</div>
{:else}
<div class="header">
<a href="#" on:click={showChoiceScreenHandler}><img src="./orbs.svg"/><img src="./orbs-text.svg"/></a>
</div>

<div class="content-container">
<div class="content-cell">
  <div class="content-header">Orbs File Notarization</div>
  
  {#if showVerify}
    <div class="content-description">Verify the document here</div>
    {#if !file}
    <div class="content-dragndrop"
      class:isDragOver
      on:dragover|preventDefault|stopPropagation={() => (isDragOver = true)}
      on:dragenter|preventDefault|stopPropagation={() => (isDragOver = true)}
      on:dragleave|preventDefault|stopPropagation={() => (isDragOver = false)}
      on:dragend|preventDefault|stopPropagation={() => (isDragOver = false)}
      on:drop|preventDefault|stopPropagation={ev => ((isDragOver = true), file = ev.dataTransfer.files[0], verifyHandler())}
      >
      <div class="document-icons">
        <img src="./pdf-file.svg"/>
        <img src="./doc-file.svg"/>
        <img src="./jpg-file.svg"/>
      </div>
      <div class="content-dragndrop-description">
        <div class="content-dragndrop-description-header">DRAG & DROP</div>
        <div class="content-dragndrop-description-subheader">to upload file</div>
      </div>
    </div>
    {/if}
  {:else if showRegister}
    <div class="content-description">Register the document here</div>
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
      {#if status}
      <button disabled={!file} on:click={updateStatus}>Update</button>
      {/if}
    </div>
    {#if error}
      <Error {error} />
    {/if}
  {/if}

  {#if results}
    <Result result={results} />
  {/if}

  {#if events}
    <Audit events={events} />
  {/if}
</div>
</div>
{/if}
