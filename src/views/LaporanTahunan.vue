<template>
  <div class="min-h-screen flex bg-gray-50">
    <SideBar />
    <div class="flex flex-col items-center p-5 bg-gray-100 w-full">
      <div class="flex justify-center items-center mb-6">
        <h2 class="text-3xl font-bold text-[#6d1b23]">Laporan Tahunan</h2>
      </div>

      <div class="flex justify-center gap-4 mb-6">
        <select v-model="selectedYear"
          class="p-3 border border-[#6d1b23] rounded-lg shadow-sm bg-white text-black-800 font-bold">
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>

      <div class="flex justify-between items-center mt-4">
        <h2 class="text-2xl font-bold mb-3">List Laporan Tahunan</h2>
      </div>
      <div class="w-full rounded-t-lg shadow-md shadow-gray-700 bg-none mb-12">
        <div class="rounded-t-lg">
          <div class="bg-[#6d1b23] text-white flex text-left md:text-center rounded-t-lg">
            <div class="p-2 text-xs md:text-lg w-1/12">No.</div>
            <div class="p-2 text-xs md:text-lg w-2/12">Tanggal Transaksi</div>
            <div class="p-2 text-xs md:text-lg w-2/12">Tipe Transaksi</div>
            <div class="p-2 text-xs md:text-lg w-2/12">Nominal</div>
            <div class="p-2 text-xs md:text-lg w-2/12">Nama Pemesan</div>
            <div class="p-2 text-xs md:text-lg w-2/12">Keterangan</div>
          </div>
        </div>
        <div>
          <div class="text-left md:text-center flex border-b-1 border-gray-400" v-for="(item, index) in filteredLaporan"
            :key="item.id">
            <div class="p-2 bg-[#D1D5DB] text-xs md:text-lg w-1/12">{{ index + 1 }}</div>
            <div class="p-2 bg-[#E5E7EB] text-xs md:text-lg w-2/12">{{ formatDate(item.createdAt) }}</div>
            <div class="p-2 bg-[#D1D5DB] text-xs md:text-lg w-2/12">{{ item.transaction_type }}</div>
            <div class="p-2 bg-[#E5E7EB] text-xs md:text-lg w-2/12">{{ item.total }}</div>
            <div class="p-2 bg-[#D1D5DB] text-xs md:text-lg w-2/12">{{ item.name }}</div>
            <div class="p-2 bg-[#E5E7EB] text-xs md:text-lg w-3/12">{{ item.description }}</div>
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
import axios from 'axios';
import * as XLSX from 'xlsx';
export default {
  components: {
    SideBar,
  },
  name: 'LaporanTahunan',
  data() {
    return {
      selectedYear: '',
      years: [2025, 2024, 2023, 2022, 2021],
      laporan: []
    };
  },
  computed: {
    filteredLaporan() {
      return this.laporan.filter(item => new Date(item.createdAt).getFullYear() === this.selectedYear);
    }
  },
  methods: {
    async fetchData() {
      try {
        const income = await axios.get('http://localhost:3000/income');
        const expenses = await axios.get('http://localhost:3000/expenses');
        income.data.forEach(item => item.transaction_type = 'Pemasukan');
        expenses.data.forEach(item => item.transaction_type = 'Pengeluaran');
        const res = [...income.data, ...expenses.data];
        res.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
        this.laporan = res
        console.log('Laporan fetched successfully:', this.laporan);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    downloadFile() {
      // Ambil data yang sudah difilter
      const data = this.filteredLaporan.map((item, index) => ({
        No: index + 1,
        'Tanggal Transaksi': this.formatDate(item.createdAt),
        'Tipe Transaksi': item.transaction_type,
        Nominal: item.total,
        'Nama Pemesan': item.name,
        Keterangan: item.description
      }));

      // Buat worksheet dan workbook
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Laporan Tahunan');

      // Simpan file
      XLSX.writeFile(workbook, `laporan_${this.selectedYear}.xlsx`);
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('id-ID', options);
    }
  },
  created() {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login')
    }
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear;
    this.fetchData();
  }
}
</script>
