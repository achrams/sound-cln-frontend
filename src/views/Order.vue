<template>
    <div class="min-h-screen flex">
        <!-- Sidebar -->
        <SideBar />
        <!-- Main Content -->
        <div class="flex flex-col items-center p-5 bg-gray-100 w-full">
            <div class="flex justify-center items-center mb-6">
                <h2 class="text-3xl font-bold text-[#6d1b23]">Form Penyewaan</h2>
            </div>
            <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl border-2 border-[#6d1b23]">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block font-bold">Nama:</label>
                        <input type="text" v-model="form.nama" placeholder="Masukkan nama"
                            class="border border-black w-full p-2 rounded-md" />

                        <label class="block font-bold mt-2">Alamat:</label>
                        <input type="text" v-model="form.alamat" placeholder="Masukkan alamat"
                            class="border border-black w-full p-2 rounded-md" />

                        <label class="block font-bold mt-2">No. Telp:</label>
                        <input type="text" v-model="form.noTelp" placeholder="Masukkan nomor telepon"
                            class="border border-black w-full p-2 rounded-md" />

                        <label class="block font-bold mt-2">Email:</label>
                        <input type="email" v-model="form.email" placeholder="Masukkan email"
                            class="border border-black w-full p-2 rounded-md" />
                    </div>

                    <div>
                        <label class="block font-bold">Pilih Paket:</label>
                        <select v-model="form.paket" class="border border-black w-full p-2 rounded-md">
                            <option selected value="">Pilih Paket</option>
                            <option v-for="item in packages" :value="item">{{ item.name }}</option>
                        </select>

                        <label class="block font-bold mt-2">Pilih Add-on:</label>
                        <div class="flex space-x-2">
                            <select v-model="addOnSelection" class="border border-black w-2/5 p-2 rounded-md">
                                <option selected :value="{}">Pilih Add-On</option>
                                <option v-for="item in items" :value="item">{{ item.name }}</option>
                            </select>
                            <input type="number" v-model="addOnSelection.qty" min="1" default="1"
                                class="border border-black w-1/4 p-2 rounded-md" placeholder="Qty" />
                            <button @click="addItem" class="bg-green-500 text-white px-4 py-2 rounded-md">Add</button>
                        </div>
                        <div v-for="(item, index) in orderList" :key="'item' + index" class="mt-2">
                            <div class="flex justify-between items-center bg-gray-100 p-2 rounded-md shadow-md">
                                <div class="w-7/12">{{ item.name }}</div>
                                <div class="w-2/12">X {{ item.qty }}</div>
                                <div class="w-3/12">
                                    <button @click="removeItem(index)"
                                        class="bg-[#6d1b23] text-white p-1 rounded-md w-full">Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr class="my-4 border-gray-300" />

                <div class="grid grid-cols-3 gap-4">
                    <div>
                        <label class="block font-bold">Tanggal Sewa:</label>
                        <input type="date" v-model="form.tanggalSewa" class="border border-black w-full p-2 rounded-md"
                            @change="hitungLamaSewa" />
                    </div>
                    <div>
                        <label class="block font-bold">Tanggal Pengembalian:</label>
                        <input type="date" v-model="form.tanggalPengembalian"
                            class="border border-black w-full p-2 rounded-md" @change="hitungLamaSewa" />
                    </div>
                    <div>
                        <label class="block font-bold">Lama Penyewaan (Hari):</label>
                        <input type="text" v-model="form.lamaSewa" class="border border-black w-full p-2 rounded-md"
                            readonly />
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label class="block font-bold">Metode Pembayaran:</label>
                        <select v-model="form.metodePembayaran" class="border border-black w-full p-2 rounded-md">
                            <option>Cash</option>
                            <option>Transfer</option>
                        </select>
                    </div>
                    <div>
                        <label class="block font-bold">Status Pembayaran:</label>
                        <select v-model="form.statusPembayaran" class="border border-black w-full p-2 rounded-md">
                            <option>Lunas</option>
                            <option>DP 50%</option>
                        </select>
                    </div>
                </div>

                <div class="flex justify-center mt-10 space-x-4">
                    <button @click="Back" class="bg-[#6d1b23] text-white px-6 py-2 rounded-md">Back</button>
                    <button @click="Order" class="bg-[#6d1b23] text-white px-6 py-2 rounded-md">Order</button>
                </div>
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
export default {
    components: { SideBar },
    data() {
        return {
            form: {
                nama: '',
                alamat: '',
                noTelp: '',
                email: '',
                paket: '',
                tanggalSewa: '',
                tanggalPengembalian: '',
                lamaSewa: '',
                metodePembayaran: 'Cash',
                statusPembayaran: 'Lunas'
            },
            addOnSelection: {},
            packages: [],
            items: [],
            orderList: []
        };
    },
    created() {
        this.getPackages();
        this.getItems();
    },
    methods: {
        async getPackages() {
            try {
                const response = await axios.get(import.meta.env.VITE_API_BASE_URL + '/packages');
                this.packages = response.data;
            } catch (error) {
                console.error("Error fetching packages:", error);
            }
        },
        async getItems() {
            try {
                const response = await axios.get(import.meta.env.VITE_API_BASE_URL + '/items');
                this.items = response.data;
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        },
        addItem() {
            if (this.addOnSelection && this.addOnSelection.qty > 0) {
                const exists = this.orderList.find(item => item.name === this.addOnSelection.name);
                if (!exists) {
                    this.orderList.push({ ...this.addOnSelection });
                } else {
                    alert("Item sudah ada dalam daftar order");
                }
            }
        },
        removeItem(index) {
            this.orderList.splice(index, 1);
        },
        hitungLamaSewa() {
            if (this.form.tanggalSewa && this.form.tanggalPengembalian) {
                const start = new Date(this.form.tanggalSewa);
                const end = new Date(this.form.tanggalPengembalian);
                this.form.lamaSewa = Math.max(Math.ceil((end - start) / (1000 * 60 * 60 * 24)), 0);
            }
        },
        Back() {
            console.log("Back button clicked");
        },
        Order() {
            const totalPackagePrice = this.form.paket ? this.form.paket.price : 0;
            const totalItemsPrice = this.orderList.reduce((total, item) => total + (item.price * item.qty), 0);
            const totalPrice = (totalPackagePrice + totalItemsPrice) * this.form.lamaSewa;
            axios.post(import.meta.env.VITE_API_BASE_URL + '/invoices', {
                name: this.form.nama,
                address: this.form.alamat,
                phone: this.form.noTelp,
                email: this.form.email,
                package: this.form.paket,
                items: this.orderList,
                rentalDate: this.form.tanggalSewa,
                returnDate: this.form.tanggalPengembalian,
                rentalDuration: this.form.lamaSewa,
                paymentMethod: this.form.metodePembayaran,
                paymentStatus: this.form.statusPembayaran,
                totalPrice: totalPrice,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            })
                .then(response => {
                    console.log("Order successful:", response.data);
                    return axios.post(import.meta.env.VITE_API_BASE_URL + '/income', {
                        name: this.form.nama,
                        phone: this.form.noTelp,
                        itemList: this.form.paket.name ? this.form.paket.name : this.orderList.map(item => item.name).join(', '),
                        description: this.orderList.map(item => item.name).join(', '),
                        type: this.form.paket.name ? 'Package' : 'Item',
                        price: totalPackagePrice + totalItemsPrice,
                        qty: this.form.lamaSewa,
                        total: totalPrice,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    });
                })
                .then(() => {
                    this.$router.push('/income');
                })
                .catch(error => {
                    console.error("Error placing order:", error);
                });
        }
    }
};
</script>
