<template>
  <div class="w-full h-full absolute">
    <div class="w-full h-full bg-[#333a45be] absolute z-30" @click="closeModal()"></div>
    <div class="flex justify-center items-center h-full">
      <div class="w-full md:w-2/5 bg-white h-screen md:h-fit rounded-xl relative z-40">
        <button
          class="right-0 absolute p-2 m-2 bg-red-900 text-white rounded-3xl shadow-md shadow-gray-700 outline-0 cursor-pointer hover:bg-red-950"
          @click="closeModal()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg></button>
        <div class="flex flex-col items-center p-4">
          <h1 class="text-4xl font-bold text-gray-800 mt-12">Tambah {{ type }}</h1>
          <div class="w-full md:w-3/4">
            <input type="text" class="w-full p-2 border-b-2 outline-0 mt-12" :placeholder="`Nama ${type}`"
              v-model="nama">
            <textarea v-if="type == 'Paket'" name="description" id="description"
              class="w-full h-24 p-2 border-b-2 outline-0 mt-4" placeholder="Deskripsi Paket" wrap="soft"
              draggable="false" style="resize: none;" v-model="deskripsi"></textarea>
            <input v-if="type == 'Barang'" class="w-full p-2 border-b-2 outline-0 mt-4" type="number" min="0"
              pattern="[0-9]*" inputmode="numeric" placeholder="Qty" v-model="qty">
            <input class="w-full p-2 border-b-2 outline-0 mt-4" type="number" min="0" pattern="[0-9]*"
              inputmode="numeric" placeholder="Harga" v-model="harga">
            <div class="flex justify-center items-center mt-4">
              <button
                class="w-full p-2 my-12 bg-red-900 text-white rounded-xl shadow-md shadow-gray-700 outline-0 cursor-pointer hover:bg-red-950"
                type="submit">Tambah</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ModalWindow',
  props: ['type'],
  data() {
    return {
      nama: '',
      deskripsi: '',
      harga: '',
      qty: '',
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    }
  }

}
</script>
<style>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* For Firefox */
input[type="number"] {
  appearance: textfield;
  -moz-appearance: textfield;
}
</style>