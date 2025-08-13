<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <SideBar />
    <!-- Main Content -->
    <div class="flex flex-col items-center p-5 bg-gray-100 w-full">
      <div
        class="flex justify-between flex-wrap bg:none md:bg-[#6d1b23] w-full text-white p-5 rounded-lg mb-5 md:shadow-md md:shadow-gray-700">
        <div
          class="text-left md:text-center p-2 md:p-0 bg-[#6d1b23]my-2 md:my-0 rounded-lg md:rounded-none text-wrap w-full md:w-1/3 text-sm md:text-md">
          <div>Pemasukan / Bulan</div>
          <div id="pemasukanBulan">{{ formatRupiah(pemasukanBulan) }}</div>
        </div>
        <div
          class="text-left md:text-center p-2 md:p-0 bg-[#6d1b23] my-2 md:my-0 rounded-lg md:rounded-none text-wrap w-full md:w-1/3 text-sm md:text-md">
          <div>Pengeluaran / Bulan</div>
          <div id="pengeluaranBulan">{{ formatRupiah(pengeluaranBulan) }}</div>
        </div>
        <div
          class="text-left md:text-center p-2 md:p-0 bg-[#6d1b23]my-2 md:my-0 rounded-lg md:rounded-none text-wrap w-full md:w-1/3 text-sm md:text-md">
          <div>Total / Tahun</div>
          <div id="totalTahun">{{ formatRupiah(totalTahun) }}</div>
        </div>
      </div>
      <div class="flex justify-between items-center mt-4 md:mt-12">
        <h2 class="text-2xl font-bold mb-3">List Paket</h2>
        <div class="w-1/2 md:w-4/12 lg:w-2/12 p-2 flex justify-end">
          <button
            class="p-2 bg-red-900 text-white rounded-3xl shadow-md shadow-gray-700 outline-0 cursor-pointer hover:bg-red-950"
            @click="openModal('Paket', 'add', null)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="#FFFF" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg></button>
        </div>
      </div>
      <div class="w-full mb-5 rounded-t-lg shadow-md shadow-gray-700 bg-none">
        <div class="rounded-t-lg">
          <div class="bg-[#6d1b23] text-white flex text-left md:text-center rounded-t-lg">
            <div class="p-2 text-xs md:text-lg w-1/12">No.</div>
            <div class="p-2 text-xs md:text-lg w-2/12">Nama Paket</div>
            <div class="p-2 text-xs md:text-lg w-5/12">Desc</div>
            <div class="p-2 text-xs md:text-lg w-3/12 md:w-2/12">Harga</div>
            <div class="p-2 text-xs md:text-lg w-3/12 md:w-2/12">Panel</div>
          </div>
        </div>
        <div v-if="paket.length">
          <div class="text-left md:text-center flex border-b-1 border-gray-400" v-for="(item, index) in paket"
            :key="item.name + index">
            <div class="p-2 bg-#D1D5DB] text-xs md:text-lg w-1/12">{{ index + 1 }}</div>
            <div class="p-2 bg-[#E5E7EB] text-xs md:text-lg w-6/12">{{ item.name }}</div>
            <div class="p-2 bg-[#D1D5DB] text-xs md:text-lg w-1/12">{{ item.description }}</div>
            <div class="p-2 bg-[#E5E7EB] text-xs md:text-lg w-3/12 md:w-2/12">{{ item.price }}</div>
            <div
              class="p-2 bg-[#D1D5DB] text-xs md:text-lg w-3/12 md:w-3/12 lg:w-2/12 flex flex-wrap justify-center items-center">
              <div class="w-full md:w-full lg:w-1/6 p-1">
                <button @click="openModal('Paket', 'edit', item)"
                  class="bg-gray-600 text-white text-xs p-2 cursor-pointer hover:bg-gray-900 rounded-4xl"><svg
                    xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="#FFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path
                      d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z">
                    </path>
                    <path d="m15 5 4 4"></path>
                  </svg></button>
              </div>
              <div class="w-full md:w-full lg:w-1/6 p-1">
                <button @click="deletePackage(item.id)"
                  class="bg-gray-600 text-white text-xs p-2 cursor-pointer hover:bg-gray-900 rounded-4xl"><svg
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
        <div v-else>
          <div class="text-left md:text-center flex items-center justify-center border-b-1 border-gray-400 h-64">
            No Data
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center mt-4 md:mt-12">
        <h2 class="text-2xl font-bold mb-3">List Barang</h2>
        <div class="w-1/2 md:w-4/12 lg:w-2/12 p-2 flex justify-end">
          <button @click="openModal('Barang', 'add', null)"
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
          <div class="bg-[#6d1b23] text-white flex text-left md:text-center rounded-t-lg">
            <div class="p-2 text-xs md:text-lg w-1/12">No.</div>
            <div class="p-2 text-xs md:text-lg w-6/12">Nama Barang</div>
            <div class="p-2 text-xs md:text-lg w-1/12">Qty</div>
            <div class="p-2 text-xs md:text-lg w-3/12 md:w-2/12">Harga</div>
            <div class="p-2 text-xs md:text-lg w-3/12 md:w-2/12">Panel</div>
          </div>
        </div>
        <div v-if="barang.length">
          <div class="text-left md:text-center flex border-b-1 border-gray-400" v-for="(item, index) in barang"
            :key="item.name + index">
            <div class="p-2 bg-#D1D5DB] text-xs md:text-lg w-1/12">{{ index + 1 }}</div>
            <div class="p-2 bg-[#E5E7EB] text-xs md:text-lg w-6/12">{{ item.name }}</div>
            <div class="p-2 bg-[#D1D5DB] text-xs md:text-lg w-1/12">{{ item.qty }}</div>
            <div class="p-2 bg-[#E5E7EB] text-xs md:text-lg w-3/12 md:w-2/12">{{ item.price }}</div>
            <div
              class="p-2 bg-[#D1D5DB] text-xs md:text-lg w-3/12 md:w-3/12 lg:w-2/12 flex flex-wrap justify-center items-center">
              <div class="w-full md:w-full lg:w-1/6 p-1">
                <button @click="openModal('Barang', 'edit', item)"
                  class="bg-gray-600 text-white text-xs p-2 cursor-pointer hover:bg-gray-900 rounded-4xl"><svg
                    xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="#FFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path
                      d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z">
                    </path>
                    <path d="m15 5 4 4"></path>
                  </svg></button>
              </div>
              <div class="w-full md:w-full lg:w-1/6 p-1">
                <button @click="deleteItem(item.id)"
                  class="bg-gray-600 text-white text-xs p-2 cursor-pointer hover:bg-gray-900 rounded-4xl"><svg
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
        <div v-else>
          <div class="text-left md:text-center flex items-center justify-center border-b-1 border-gray-400 h-64">
            No Data
          </div>
        </div>
      </div>
    </div>
    <ModalWindow v-if="showModal" @closeModal="showModal = false" :mode="modalMode" :type="modalType"
      :selectedItem="selectedItem" />
  </div>

  <!-- Footer -->
  <footer class="text-center py-3 bg-[#6d1b23] text-white w-full bottom-0 z-10">
    © All Rights Reserved.
  </footer>
</template>

<script>
import SideBar from '@/components/Sidebar.vue';
import ModalWindow from '../components/Modal.vue'
import axios from 'axios';
export default {
  components: {
    ModalWindow,
    SideBar
  },
  name: 'DashboardEST',
  data() {
    return {
      showModal: false,
      modalType: '',
      modalMode: '',
      currentRoute: '/',
      pemasukanBulan: 0,
      pengeluaranBulan: 0,
      totalTahun: 0,
      selectedItem: {},
      paket: [],
      barang: [],
    }
  },
  methods: {
    async getCalculations() {
      try {
        const pemasukan = await axios.get('http://localhost:3000/income');
        const pengeluaran = await axios.get('http://localhost:3000/expenses');
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        const currrentIncome = pemasukan.data.filter(item => new Date(item.createdAt).getFullYear() == currentYear && (new Date(item.createdAt).getMonth() + 1 === currentMonth));
        const currentExpenses = pengeluaran.data.filter(item => new Date(item.createdAt).getFullYear() == currentYear && (new Date(item.createdAt).getMonth() + 1 === currentMonth));
        const totalIncome = currrentIncome.reduce((acc, item) => acc + item.price, 0);
        const totalExpenses = currentExpenses.reduce((acc, item) => acc + item.price, 0);
        this.pemasukanBulan = totalIncome;
        this.pengeluaranBulan = totalExpenses;
        const totalYearIncome = pemasukan.data.reduce((acc, item) => acc + item.price, 0);
        const totalYearExpenses = pengeluaran.data.reduce((acc, item) => acc + item.price, 0);
        this.totalTahun = totalYearIncome - totalYearExpenses;
      } catch (err) {
        console.error('Error fetching calculations:', err);
      }
    },

    formatRupiah(value) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(value);
    },
    getPackages: function () {
      axios.get('http://localhost:3000/packages')
        .then(response => {
          this.paket = response.data;
          console.log(response.data)
        })
        .catch(error => {
          console.error('Error fetching packages:', error);
        });
    },

    getItems: function () {
      axios.get('http://localhost:3000/items')
        .then(response => {
          this.barang = response.data;
        })
        .catch(error => {
          console.error('Error fetching items:', error);
        });
    },

    deletePackage: function (id) {
      axios.delete(`http://localhost:3000/packages/${id}`)
        .then(response => {
          this.getPackages();
        })
        .catch(error => {
          console.error('Error deleting package:', error);
        });
    },

    deleteItem: function (id) {
      axios.delete(`http://localhost:3000/items/${id}`)
        .then(response => {
          this.getItems();
        })
        .catch(error => {
          console.error('Error deleting item:', error);
        });
    },

    goTo(route) {
      if (this.currentRoute !== route) this.$router.push(route)
    },
    openModal(type, mode, item) {
      this.modalType = type
      this.modalMode = mode
      this.showModal = true
      this.selectedItem = item || {};
    },
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  },
  created() {
    console.log(this.$route.path)
    this.getPackages();
    this.getItems();
    this.getCalculations();
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login')
    }
  }
};
</script>

<style>
/* Anda bisa menambahkan custom CSS di sini jika diperlukan */
</style>