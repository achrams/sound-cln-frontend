<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <div
      class="md:w-56 lg:w-72 hidden h-screen md:flex bg-gray-200 text-black py-5 flex-col items-center shadow-lg shadow-gray-700">
      <img src="../assets/estlogo.png" alt="EST Logo" class="w-36 mb-5">
      <div class="w-full h-screen text-center">
        <a @click="goTo('/')" :class="currentRoute == '/' ? 'bg-gray-300 scale-105 shadow-gray-900' : 'bg-none'"
          class="block cursor-pointer py-3 px-4 font-semibold text-lg bg-gray-200 hover:bg-gray-400 hover:scale-105 duration-150 delay-75 hover:text-white shadow-xs shadow-gray-950">Dashboard</a>
        <a @click="goTo('/order')" :class="currentRoute == '/order' ? 'bg-gray-300 scale-105' : 'bg-none'"
          class="block cursor-pointer py-3 px-4 font-semibold text-lg bg-gray-200 hover:bg-gray-400 hover:scale-105 duration-150 delay-75 hover:text-white">Order</a>
        <a @click="goTo('/income')" :class="currentRoute == '/income' ? 'bg-gray-300 scale-105' : 'bg-none'"
          class="block cursor-pointer py-3 px-4 font-semibold text-lg bg-gray-200 hover:bg-gray-400 hover:scale-105 duration-150 delay-75 hover:text-white">Laporan
          Pemasukan</a>
        <a @click="goTo('/expenditure')" :class="currentRoute == '/expenditure' ? 'bg-gray-300 scale-105' : 'bg-none'"
          class="block cursor-pointer py-3 px-4 font-semibold text-lg bg-gray-200 hover:bg-gray-400 hover:scale-105 duration-150 delay-75 hover:text-white">Laporan
          Pengeluaran</a>
        <a @click="goTo('/report')" :class="currentRoute == '/report' ? 'bg-gray-300 scale-105' : 'bg-none'"
          class="block cursor-pointer py-3 px-4 font-semibold text-lg bg-gray-200 hover:bg-gray-400 hover:scale-105 duration-150 delay-75 hover:text-white">Laporan
          Tahunan</a>
        <a class="mt-5 block cursor-pointer py-3 px-4 font-semibold text-lg hover:bg-gray-400 hover:scale-105 duration-150 delay-75 hover:text-white bottom-0"
          @click="logout()">Log
          Out</a>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-5 bg-gray-100 w-full">
      <div
        class="flex justify-between flex-wrap bg:none md:bg-red-800 text-white p-5 rounded-lg mb-5 md:shadow-md md:shadow-gray-700">
        <div
          class="text-left md:text-center p-2 md:p-0 bg-red-800 my-2 md:my-0 rounded-lg md:rounded-none text-wrap w-full md:w-1/3 text-sm md:text-md">
          <div>Pemasukan / Bulan</div>
          <div id="pemasukanBulan">Rp 0</div>
        </div>
        <div
          class="text-left md:text-center p-2 md:p-0 bg-red-800 my-2 md:my-0 rounded-lg md:rounded-none text-wrap w-full md:w-1/3 text-sm md:text-md">
          <div>Pengeluaran / Bulan</div>
          <div id="pengeluaranBulan">Rp 0</div>
        </div>
        <div
          class="text-left md:text-center p-2 md:p-0 bg-red-800 my-2 md:my-0 rounded-lg md:rounded-none text-wrap w-full md:w-1/3 text-sm md:text-md">
          <div>Total / Tahun</div>
          <div id="totalTahun">Rp 0</div>
        </div>
      </div>
      <div class="flex justify-between items-center mt-4 md:mt-12">
        <h2 class="text-2xl font-bold mb-3">List Paket</h2>
        <div class="w-1/2 md:w-4/12 lg:w-2/12 p-2 flex justify-end">
          <button
            class="p-2 bg-red-900 text-white rounded-3xl shadow-md shadow-gray-700 outline-0 cursor-pointer hover:bg-red-950"
            @click="openModal('Paket')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="#FFFF" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg></button>
        </div>
      </div>
      <div class="w-full mb-5 rounded-t-lg shadow-md shadow-gray-700 bg-none">
        <div class="rounded-t-lg">
          <div class="bg-red-800 text-white flex text-left md:text-center rounded-t-lg">
            <div class="p-2 text-xs md:text-lg w-1/12">No.</div>
            <div class="p-2 text-xs md:text-lg w-2/12">Nama Paket</div>
            <div class="p-2 text-xs md:text-lg w-5/12">Desc</div>
            <div class="p-2 text-xs md:text-lg w-3/12 md:w-2/12">Harga</div>
            <div class="p-2 text-xs md:text-lg w-3/12 md:w-2/12">Panel</div>
          </div>
        </div>
        <div>
          <div class="text-left md:text-center flex border-b-1 border-gray-400" v-for="(item, index) in paket"
            :key="item.nama + index">
            <div class="p-2 bg-[#71f4e2] text-xs md:text-lg w-1/12">{{ index + 1 }}</div>
            <div class="p-2 bg-[#a0fff2] text-xs md:text-lg w-2/12">{{ item.nama }}</div>
            <div class="p-2 bg-[#71f4e2] text-xs md:text-lg text-wrap w-5/12">{{ item.desc }}</div>
            <div class="p-2 bg-[#a0fff2] text-xs md:text-lg w-3/12 md:w-2/12">{{ item.harga }}</div>
            <div
              class="p-2 bg-[#71f4e2] text-xs md:text-lg w-3/12 md:w-3/12 lg:w-2/12 flex flex-wrap justify-center items-center">
              <div class="w-full md:w-full lg:w-1/6 p-1">
                <button class="bg-gray-600 text-white text-xs p-2 cursor-pointer hover:bg-gray-900 rounded-4xl"><svg
                    xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="#FFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path
                      d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z">
                    </path>
                    <path d="m15 5 4 4"></path>
                  </svg></button>
              </div>
              <div class="w-full md:w-full lg:w-1/6 p-1">
                <button class="bg-gray-600 text-white text-xs p-2 cursor-pointer hover:bg-gray-900 rounded-4xl"><svg
                    xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="#FFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center mt-4 md:mt-12">
        <h2 class="text-2xl font-bold mb-3">List Barang</h2>
        <div class="w-1/2 md:w-4/12 lg:w-2/12 p-2 flex justify-end">
          <button @click="openModal('Barang')"
            class="p-2 bg-red-900 text-white rounded-3xl shadow-md shadow-gray-700 outline-0 cursor-pointer hover:bg-red-950"><svg
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFF"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg></button>
        </div>
      </div>
      <div class="w-full rounded-t-lg shadow-md shadow-gray-700 bg-none mb-12">
        <div class="rounded-t-lg">
          <div class="bg-red-800 text-white flex text-left md:text-center rounded-t-lg">
            <div class="p-2 text-xs md:text-lg w-1/12">No.</div>
            <div class="p-2 text-xs md:text-lg w-6/12">Nama Barang</div>
            <div class="p-2 text-xs md:text-lg w-1/12">Qty</div>
            <div class="p-2 text-xs md:text-lg w-3/12 md:w-2/12">Harga</div>
            <div class="p-2 text-xs md:text-lg w-3/12 md:w-2/12">Panel</div>
          </div>
        </div>
        <div>
          <div class="text-left md:text-center flex border-b-1 border-gray-400" v-for="(item, index) in barang"
            :key="item.nama + index">
            <div class="p-2 bg-[#71f4e2] text-xs md:text-lg w-1/12">{{ index + 1 }}</div>
            <div class="p-2 bg-[#a0fff2] text-xs md:text-lg w-6/12">{{ item.nama }}</div>
            <div class="p-2 bg-[#71f4e2] text-xs md:text-lg w-1/12">{{ item.qty }}</div>
            <div class="p-2 bg-[#a0fff2] text-xs md:text-lg w-3/12 md:w-2/12">{{ item.harga }}</div>
            <div
              class="p-2 bg-[#71f4e2] text-xs md:text-lg w-3/12 md:w-3/12 lg:w-2/12 flex flex-wrap justify-center items-center">
              <div class="w-full md:w-full lg:w-1/6 p-1">
                <button class="bg-gray-600 text-white text-xs p-2 cursor-pointer hover:bg-gray-900 rounded-4xl"><svg
                    xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="#FFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path
                      d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z">
                    </path>
                    <path d="m15 5 4 4"></path>
                  </svg></button>
              </div>
              <div class="w-full md:w-full lg:w-1/6 p-1">
                <button class="bg-gray-600 text-white text-xs p-2 cursor-pointer hover:bg-gray-900 rounded-4xl"><svg
                    xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="#FFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalWindow v-if="showModal" @closeModal="showModal = false" :type="modalType" />
  </div>

  <!-- Footer -->
  <footer class="text-center py-3 bg-red-800 text-white w-full bottom-0 z-10">
    © All Rights Reserved.
  </footer>
</template>

<script>
import ModalWindow from '../components/Modal.vue'
export default {
  components: {
    ModalWindow
  },
  name: 'DashboardEST',
  data() {
    return {
      showModal: false,
      modalType: '',
      currentRoute: '/',
      pemasukanBulan: 0,
      pengeluaranBulan: 0,
      totalTahun: 0,
      paket: [
        { id: 1, nama: 'Paket Murah Meriah', desc: 'Mic, Mixer, 2 Soundsystem', harga: 50000 },
        { id: 2, nama: 'Paket Premium', desc: 'Mic, Mixer, Soundsystem, 3 Soundsystem', harga: 100000 },
        { id: 3, nama: 'Paket Premium Plus', desc: 'Mic, Mixer, Soundsystem, 3 Soundsystem, AC', harga: 1500 }

      ],
      barang: [
        { id: 1, nama: 'Soundsystem ATRAC 250', qty: 1, harga: 150000 },
        { id: 2, nama: 'Speaker Pioneer 200 db', qty: 1, harga: 75000 },
        { id: 3, nama: 'Soundsystem Sony MDR-7506', qty: 1, harga: 120000 },

      ],
    }
  },
  methods: {
    goTo(route) {
      if (this.currentRoute !== route) this.$router.push(route)
    },
    openModal(type) {
      this.modalType = type
      this.showModal = true
    },
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  },
  created() {
    console.log(this.$route.path)
  }
};
</script>

<style>
/* Anda bisa menambahkan custom CSS di sini jika diperlukan */
</style>