<script>
  import { createEventDispatcher } from 'svelte';
  export let fileName = "";

  const dispatch = createEventDispatcher();

  const handleFile = file => {
    if (file) {
      fileName = file.name;
    }
    dispatch('change', {file});
  };

  const getFileElement = () => {
    return document.getElementById("file")
  }
</script>

<style>
  input[type=file] {
    border: none;
    visibility: hidden;
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
</style>

<div class="file-upload" on:click={() => getFileElement().click()}>
    <img src="./upload-doc.svg" class="icon">
    <span class="file-name">{fileName}</span>
    <span class="change-file-button">Select File</span>
    <input type="file" id="file" on:change={() => handleFile(this.files[0])} />
</div>
