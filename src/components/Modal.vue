<template>
  <div class="w-full h-full absolute">
    <div class="w-full h-full bg-[#333a45be] absolute z-30" @click="closeModal()"></div>
    <div class="flex justify-center items-center h-full">
      <div class="w-full md:w-2/5 bg-white h-screen md:h-2/4 rounded-xl relative z-40">
        <button
          class="right-0 absolute p-2 m-2 bg-red-900 text-white rounded-3xl shadow-md shadow-gray-700 outline-0 cursor-pointer hover:bg-red-950"
          @click="closeModal()"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg></button>
        <div class="flex flex-col items-center p-4">
          <h1 class="text-4xl font-bold text-gray-800">Your Title</h1>
          <p class="text-xl text-gray-600">Your content goes here...</p>
          <button
            class="w-full md:w-auto mt-4 bg-blue-500 text-white rounded-xl shadow-md shadow-gray-700 outline-0 cursor-pointer hover:bg-blue-550">
            Button Text
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ModalWindow',
  methods: {
    closeModal() {
      this.$emit('closeModal');
    }
  }

}
</script>