<template>
  <router-view />
  <router-view name="classRoom" />
</template>

<script>
import AuthContext from "./uses/Auth";
import "./styles/main.css";
export default {
  name: "App",
  beforeCreate() {
    const { checkAuthenticaiton } = AuthContext();
    checkAuthenticaiton();
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: sans-serif;
  font-size: 14px;
  line-height: 20px;
}
body {
  height: 100vh;
  overflow: hidden;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  width: 4px;
  height: 4px;
  background-color: #b6b9ce;
  border-radius: 2px;
  cursor: pointer;
}
</style>
