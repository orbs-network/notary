<script>
  import { createEventDispatcher } from 'svelte';
  export let actions;
  export let status;
  let fileName = "Select file";

  const dispatch = createEventDispatcher();

  const handleFile = file => {
    fileName = file.name;
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
      padding: 13px;
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
</style>

<div class="container">
  <div class="file-upload" on:click={() => getFileElement().click()}>
  <img src="./upload-doc.svg" class="icon">
  <span class="file-name">{fileName}</span>
  <span class="change-file-button">Change File</span>
  </div>
  <input type="file" id="file" on:change={() => handleFile(this.files[0])} />
  <br/>
  <div class="input-description" >
  <img src="description.svg" class="icon"/>
  <span class="input-description-text" on:change={() => handleMetadata(this.value)} contenteditable="true">Document description</span>
  </div>
  <br/>
  {#if status}
  {#await statusList}
  <!-- -->
  {:then list}
  <select on:change={() => { handleStatus(this.value) }}>
  {#each list as potentialStatus, i }
    <option selected={status == potentialStatus}>{potentialStatus}</option>
  {/each}
  </select>
  {:catch error}
  <!-- -->
  {/await}
  {/if}
</div>
