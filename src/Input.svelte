<script>
  import { createEventDispatcher } from 'svelte';
  export let actions;
  export let status;
  let fileName = "";

  const dispatch = createEventDispatcher();

  const handleFile = file => {
    if (file) {
      fileName = file.name;
    }
    dispatch('change', {file});
  };

  const handleMetadata = (metadata) => {
    dispatch('change', {metadata});
  };

  const handleStatus = (value) => {
    dispatch('change', {status: value});
  }

  let statusList = actions.getStatusList();

  const getFileElement = () => {
    return document.getElementById("file")
  }

</script>

<style>  
  input[type=file] {
    border: none;
    visibility: hidden;
  }
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

  .file-upload {
      border: solid 1px #ebebeb;
      padding: 10px;
      vertical-align: middle;
  }

  .file-name {
    font-family: Montserrat;
    font-size: 13px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 2;
    letter-spacing: 0.21px;
    color: #202020;
    padding-left: 10px;
  }

  .change-file-button {
    font-family: Montserrat;
    font-size: 13px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 2.17;
    letter-spacing: 0.19px;
    text-align: center;
    color: #ffffff;
    background-color: darkgrey;
    border-radius: 20px;
    padding-left: 10px;
    padding-right: 10px;
    float: right;
    cursor: pointer;
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
  <div class="file-upload" on:click={() => getFileElement().click()}>
  <img src="./upload-doc.svg" class="icon">
  <span class="file-name">{fileName}</span>
  <span class="change-file-button">Select File</span>
  </div>
  <input type="file" id="file" on:change={() => handleFile(this.files[0])} />
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
