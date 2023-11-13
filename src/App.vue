<template>
  <div id="app">
    <div id="nav">
      <div class="nav-div">
        <router-link to="/" class="link">Upload</router-link>
        <router-link to="/list" class="link">List</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// functions that mutate state and trigger updates
</script>

<style scoped>
html, body {
  margin: 0px !important;
  padding: 0px !important;
}

#nav {
  display: flex;
  justify-content: center;
  background:#f3f3f3;
  margin: 0;
}

.link {
  color: #666666;
  text-decoration: none;
  font-size: 20px;
  padding: 15px;
}

.nav-div {
  display: flex;
  width: 20%;
  justify-content: center;
}

.router-link-active{
  color: #ffffff;
  background: #008cba;
}
</style>
