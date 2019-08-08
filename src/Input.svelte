<script>
  import { createEventDispatcher } from 'svelte';
  import SelectFile from "./SelectFile.svelte";
  export let status;
  export let actions;
  

  const dispatch = createEventDispatcher();

  const handleFile = (ev) => {
    if (ev.detail.file) {
      dispatch('change', {file: ev.detail.file});
    }
  }

  const handleMetadata = (metadata) => {
    dispatch('change', {metadata});
  };

  const handleStatus = (value) => {
    dispatch('change', {status: value});
  }

  let statusList = actions.getStatusList();
</script>

<style>
  .input-description {
    font-family: Montserrat;
    font-size: 13px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 2;
    letter-spacing: 0.21px;
    color: #202020;
    border: solid 1px #ebebeb;
    padding: 10px; 
  }

  .input-description-text { 
    padding-left: 10px;
    outline: none; 
  }

  .icon {
    vertical-align: middle;
  }

  .input-status {
    display: block;
    font-size: 13px;
    font-family: Montserrat;
    font-weight: normal;
    color: #444;
    line-height: 1.3;
    padding: 10px;
    padding-top: 13px;
    width: 100%;
    max-width: 100%; 
    box-sizing: border-box;
    margin: 0;
    margin-bottom: 20px;
    border: solid 1px #ebebeb;
    border-radius: 0px;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    padding-left: 50px;
  }
</style>

<div class="container">
  <SelectFile 
    on:change={handleFile}
   />
  <br/>
  <div class="input-description" >
  <img src="description.svg" class="icon"/>
  <span class="input-description-text" on:input={() => handleMetadata(this.innerText)} contenteditable="true">Document description</span>
  </div>
  <br/>
  <!-- {#if status} -->
  {#await statusList}
  <!-- -->
  {:then list}
  <!-- <select class="input-status input-status-icon" on:change={() => { handleStatus(this.value) }}>
  {#each list as potentialStatus, i }
    <option selected={status == potentialStatus}>{potentialStatus}</option>
  {/each}
  </select> -->
  {:catch error}
  <!-- -->
  {/await}
  <!-- {/if} -->
</div>
