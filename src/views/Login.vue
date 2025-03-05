<template>
  <div>
    <div class="w-full h-screen flex flex-col items-center justify-center bg-[#e8e6e3]">
      <div class="w-full md:w-1/3 h-full md:h-fit p-12 bg-white rounded-lg flex flex-col items-center">
        <div class="w-1/2 md:w-1/3 my-4">
          <img src="../assets/estlogo.png" alt="EST Logo" class="w-full h-auto">
        </div>
        <div class="w-full mt-2 p-2">
          <input class="w-full p-2 border-b-2 border-b-gray-300 outline-0 bg-white" type="text" v-model="username" placeholder="Username" name="cln_sound_ung" autocomplete="off" autocorrect="off" spellcheck="false">
        </div>
        <div class="w-full my-1 p-2">
          <input class="w-full p-2 border-b-2 border-b-gray-300 outline-0 bg-white" type="password" v-model="password" placeholder="Password" name="cln_sound_pwg" autocomplete="off" autocorrect="off" spellcheck="false">
        </div>
        <div class="w-full my-4 p-2">
          <button class="py-2 hover:cursor-pointer hover:bg-[#4d3539] text-white rounded-lg bg-[#6d1b23] w-full" @click="login">Login</button>
        </div>
      </div>
    </div>
    <footer class="p-2 bg-[#6d1b23] text-white absolute bottom-0 w-full">
      © All Rights Reserved.
    </footer>
  </div>
</template>

<script>
import Toastify from 'toastify-js'

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
</style>