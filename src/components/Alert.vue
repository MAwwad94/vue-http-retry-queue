<template>
  <div id="alert">
    <div>HTTP Error, retry?</div>
    <ul>
      <li v-for="alert in alerts">{{alert.reason}}</li>
    </ul>
    <button type="button" @click="retry">Retry</button>
  </div>
</template>
<script>
export default {
  props: {
    retryFn: {
      type: Function
    },
    alerts: {
      type: Array
    }
  },
  methods: {
    retry() {
      this.retryFn();
    }
  },
  destroyed() {
    console.log("removing alert");
    document.getElementById("app").removeChild(this.$el);
  },
  watch: {
    alerts(val) {
      // watch alerts array, if we are empty or set empty from some
      // other source, we no longer need to display this alert.
      if (!val || !val.length) {
        this.$destroy();
      }
    }
  }
};
</script>
