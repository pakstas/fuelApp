<template>
  <div class="notification" v-bind:class="type">
    <button class="delete" @click="close()"></button>
    {{ message }}
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Notification",
  props: {
    display: Boolean,
    type: String,
    message: String,
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
