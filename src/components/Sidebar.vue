<template>
    <div
        class="md:w-56 lg:w-72 hidden min-h-full md:flex bg-gray-200 text-black py-5 flex-col items-center shadow-lg shadow-gray-700">
        <img src="../assets/estlogo.png" alt="EST Logo" class="w-36 mb-5">
        <div class="w-full h-screen text-center">
            <a @click="goTo('/')" :class="currentRoute == '/' ? 'bg-gray-300 scale-105 shadow-gray-900' : 'bg-none'"
                class="block cursor-pointer py-3 px-4 font-semibold text-lg bg-gray-200 hover:bg-gray-400 hover:scale-105 duration-150 delay-75 hover:text-white shadow-xs shadow-gray-950">Dashboard</a>
            <a @click="goTo('/order')" :class="currentRoute == '/order' ? 'bg-gray-300 scale-105' : 'bg-none'"
                class="block cursor-pointer py-3 px-4 font-semibold text-lg bg-gray-200 hover:bg-gray-400 hover:scale-105 duration-150 delay-75 hover:text-white">Order</a>
            <a @click="goTo('/income')" :class="currentRoute == '/income' ? 'bg-gray-300 scale-105' : 'bg-none'"
                class="block cursor-pointer py-3 px-4 font-semibold text-lg bg-gray-200 hover:bg-gray-400 hover:scale-105 duration-150 delay-75 hover:text-white">Laporan
                Pemasukan</a>
            <a @click="goTo('/expenditure')"
                :class="currentRoute == '/expenditure' ? 'bg-gray-300 scale-105' : 'bg-none'"
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
</template>
<script>
export default {
    name: 'SideBar',
    data() {
        return {
            currentRoute: ''
        }
    },
    methods: {
        goTo(route) {
            if (this.currentRoute !== route) this.$router.push(route)
        },
        logout() {
            localStorage.removeItem('token')
            this.$router.push('/login')
        }
    },
    created() {
    console.log(this.$route.path)
    this.currentRoute = this.$route.path
  }
}
</script>