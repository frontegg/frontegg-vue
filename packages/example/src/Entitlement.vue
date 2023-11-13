<template>
    <span>
      <div v-if="isEntitled" class="truthy">
        {{ name }}
      </div>
      
      <div v-if="!isEntitled" class="falsy">
        {{ name }}
        <br/><br/>
        <i>{{justification?.toString()}}</i>
      </div>
    </span>
  </template>
  
  <script>
  export default {
    name: 'Entitlement',
    props: {
      name: '',
      isEntitled: '',
      justification: '',
    },
  };
  </script>
  
  <style>
  
  .truthy {
    display: inline-block;
    word-wrap: break-word;
    border: 1px dotted black;
    height: 100px;
    width: 360px;
    background-color: lightgreen;
    margin: 10px;
    padding: 5px;
  
    animation: fadeInAnimation ease 3s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  
    @keyframes fadeInAnimation {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
  }
  
  .falsy {
    display: inline-block;
    word-wrap: break-word;
    border: 1px dotted black;
    height: 100px;
    width: 360px;
    background-color: pink;
    margin: 10px;
    padding: 5px;
  
    animation: fadeInAnimation ease 3s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    @keyframes fadeInAnimation {
      0% {
          opacity: 0;
      }
      100% {
          opacity: 1;
      }
    }
  }
  
  .outer-container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  
  .boxes-container {
    display: flex;
    flex-wrap: wrap;
    max-width: 900px;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  
  .entitlements-button-container {
    width: 400px;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    font-size: 0.5em;
  }
  </style>
  