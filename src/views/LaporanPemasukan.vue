<template>
  <div class="min-h-screen flex bg-gray-50">
    <SideBar />
    <div class="flex flex-col items-center p-5 bg-gray-100 w-full">
      <div class="flex justify-center items-center mb-6">
        <h2 class="text-3xl font-bold text-[#6d1b23]">Laporan Pemasukan</h2>
      </div>

      <div class="flex justify-center gap-4 mb-6">
        <select @change="changeDate" v-model="selectedMonth"
          class="p-3 border border-[#6d1b23] rounded-lg shadow-sm bg-white text-black-800 font-bold">
          <option v-for="(month, index) in months" :key="index" :value="index + 1">{{ month }}</option>
        </select>
        <select @change="changeDate" v-model="selectedYear"
          class="p-3 border border-[#6d1b23] rounded-lg shadow-sm bg-white text-black-800 font-bold">
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>

      <div class="flex justify-between items-center mt-4">
        <h2 class="text-2xl font-bold mb-3">List Paket</h2>
      </div>
      <div class="w-full mb-5 rounded-t-lg shadow-md shadow-gray-700 bg-none">
        <div class="rounded-t-lg">
          <div class="bg-[#6d1b23] text-white flex text-left md:text-center rounded-t-lg">
            <div class="p-2 text-xs md:text-lg w-1/12">No.</div>
            <div class="p-2 text-xs md:text-lg w-2/12">Nama Pemesan</div>
            <div class="p-2 text-xs md:text-lg w-2/12">No. HP</div>
            <div class="p-2 text-xs md:text-lg w-2/12">Nama Barang</div>
            <div class="p-2 text-xs md:text-lg w-2/12">Keterangan</div>
            <div class="p-2 text-xs md:text-lg w-1/12">Qty</div>
            <div class="p-2 text-xs md:text-lg w-2/12">Harga</div>
          </div>
        </div>
        <div v-if="paket.length">
          <div class="text-left md:text-center flex border-b-1 border-gray-400" v-for="(item, index) in paket"
            :key="item.nama + index">
            <div class="p-2 bg-[#D1D5DB] text-xs md:text-lg w-1/12">{{ index + 1 }}</div>
            <div class="p-2 bg-[#E5E7EB] text-xs md:text-lg w-2/12">{{ item.name }}</div>
            <div class="p-2 bg-[#D1D5DB] text-xs md:text-lg w-2/12">{{ item.phone }}</div>
            <div class="p-2 bg-[##E5E7EB] text-xs md:text-lg w-2/12">{{ item.itemList }}</div>
            <div class="p-2 bg-[#D1D5DB] text-xs md:text-lg w-2/12">{{ item.description }}</div>
            <div class="p-2 bg-[#E5E7EB] text-xs md:text-lg w-1/12">{{ item.qty }}</div>
            <div class="p-2 bg-[#D1D5DB] text-xs md:text-lg w-2/12">{{ item.total }}</div>
          </div>
        </div>
        <div v-else>
          <div class="text-left md:text-center flex items-center justify-center border-b-1 border-gray-400 h-24">
            No Data Available
          </div>
        </div>
      </div>

      <div class="flex justify-between items-center mt-4 md:mt-12">
        <h2 class="text-2xl font-bold mb-3">List Barang</h2>
      </div>
      <div class="w-full rounded-t-lg shadow-md shadow-gray-700 bg-none mb-12">
        <div class="rounded-t-lg">
          <div class="bg-[#6d1b23] text-white flex text-left md:text-center rounded-t-lg">
            <div class="p-2 text-xs md:text-lg w-1/12">No.</div>
            <div class="p-2 text-xs md:text-lg w-2/12">Nama Pemesan</div>
            <div class="p-2 text-xs md:text-lg w-2/12">No. HP</div>
            <div class="p-2 text-xs md:text-lg w-2/12">Nama Barang</div>
            <div class="p-2 text-xs md:text-lg w-2/12">Keterangan</div>
            <div class="p-2 text-xs md:text-lg w-1/12">Qty</div>
            <div class="p-2 text-xs md:text-lg w-2/12">Harga</div>
          </div>
        </div>
        <div v-if="barang.length">
          <div class="text-left md:text-center flex border-b-1 border-gray-400" v-for="(item, index) in barang"
            :key="item.nama + index">
            <div class="p-2 bg-[#D1D5DB] text-xs md:text-lg w-1/12">{{ index + 1 }}</div>
            <div class="p-2 bg-[#E5E7EB] text-xs md:text-lg w-2/12">{{ item.name }}</div>
            <div class="p-2 bg-[#D1D5DB] text-xs md:text-lg w-2/12">{{ item.phone }}</div>
            <div class="p-2 bg-[#E5E7EB] text-xs md:text-lg w-2/12">{{ item.itemList }}</div>
            <div class="p-2 bg-[#D1D5DB] text-xs md:text-lg w-2/12">{{ item.description }}</div>
            <div class="p-2 bg-[#E5E7EB] text-xs md:text-lg w-1/12">{{ item.qty }}</div>
            <div class="p-2 bg-[#D1D5DB] text-xs md:text-lg w-2/12">{{ item.total }}</div>
          </div>
        </div>
        <div v-else>
          <div class="text-left md:text-center flex items-center justify-center border-b-1 border-gray-400 h-24">
            No Data Available
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-6">
        <button @click="downloadFile" class="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">
          Download File
        </button>
      </div>
    </div>
  </div>
  <footer class="text-center py-3 bg-[#6d1b23] text-white w-full bottom-0 z-10">
    © All Rights Reserved.
  </footer>
</template>

<script>
import SideBar from '@/components/Sidebar.vue';
import ModalWindow from '../components/Modal.vue';
import axios from 'axios';
export default {
  components: {
    ModalWindow,
    SideBar,
  },
  name: 'DashboardEST',
  data() {
    return {
      selectedMonth: '',
      selectedYear: '',
      months: [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ],
      years: [2025, 2024, 2023, 2022, 2021],
      paket: [],
      barang: [],
    };
  },
  methods: {
    changeDate() {
      this.fetchData();
    },
    goTo(route) {
      if (this.$route.path !== route) this.$router.push(route);
    },
    openModal(type) {
      this.modalType = type;
      this.showModal = true;
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    async fetchData() {

      const response = await axios.get('http://localhost:3000/income', {
        params: {
          month: this.selectedMonth,
          year: this.selectedYear
        }
      });

      const filteredPaket = response.data.filter(item => item.type === 'Package');
      const filteredBarang = response.data.filter(item => item.type === 'Item');
      this.paket = filteredPaket
      this.barang = filteredBarang;
    }
  },
  created() {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login')
    }
    const dateArr = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }).split(" ");
    console.log(dateArr);
    this.selectedMonth = this.months.indexOf(dateArr[1]) + 1; // Convert month name to index
    this.selectedYear = dateArr[2];
    this.fetchData();
  }
}
</script>
