<template>
  <div id="app">
    <button @click="addQueue">Add Queue</button>
    <!-- <button @click="retryAll">Retry All</button> -->
    <button @click="cancelAll">Cancel All</button>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import ServiceQueue from './security/http-retry-queue.js';
import http from './security/http.js';
export default {
  name: "App",
  components: {
    HelloWorld
  },
  methods: {
    addQueue () {
      http.get('https://httpstat.us/500')
        .then(()=> {
          console.log('I RESOLVED')
        }, () => {
          console.log('CANCELLED')
        })
    },
    retryAll () {
      ServiceQueue.retryAll()
    },
    cancelAll () {
      ServiceQueue.cancelAll()
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
