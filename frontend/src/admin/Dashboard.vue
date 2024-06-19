<template>
    <div class="admin-container">
        <div class="d-flex justify-content-between">
            <h3 v-if="staff" style="align-items: center;">歡迎 {{ staff.staff_name }} 員工!</h3>
            <h1 v-else>Hello Admin!</h1>
            <!-- <button class="btn" @click="getTodayOrders()">Today's Orders</button> -->
            <button class="btn" @click="handleLogout()">Logout</button>
        </div>

        <div class="table-responsive">
            <!-- PROJECT TABLE -->
            <table class="table colored-header datatable project-list">
                <thead>
                    <tr>
                        <th>Bill Id</th>
                        <th>User Id</th>
                        <th>When</th>
                        <th>Paid</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Seat Id</th>
                        <th>Seat</th>
                        <th>Seat Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(b) in filterBills.slice().reverse()" :key="b.bill_id">
                        <td>{{ b.bill_id }}</td>
                        <td>{{ b.user_id }}</td>
                        <td>{{ b.bill_when }}</td>
                        <td>{{ b.bill_paid }}</td>
                        <td>${{ b.bill_total }}</td>
                        <td>{{ avaiableStatus[b.bill_status] }}</td>
                        <td>
                            <button v-if="b.bill_status < 5" class="action-btn" @click="nextStatusBtn(b.bill_id)">
                                {{ avaiableStatus[b.bill_status + 1] }}
                            </button>

                            <button v-if="b.bill_status == 1" class="cancel-btn" @click="cancelBtn(b.bill_id)">
                                Cancel
                            </button>

                            <button v-else-if="b.bill_status == 5 && b.bill_paid == 'false'" class="paid-btn"
                                @click="paidBtn(b.bill_id)">
                                Paid
                            </button>

                            <button v-else-if="b.bill_status == 5 && b.bill_paid == 'true' && b.seat_status === 4" class="action-btn"
                                @click="nextStatusBtn(b.bill_id)">
                                {{ avaiableStatus[b.bill_status + 1] }}
                            </button>
                        </td>
                        <td>{{ b.seat_id }}</td>
                        <td >{{ seatStatus[b.seat_status] }}</td>
                        <td>
                            <button v-if="b.seat_status < 4 && b.seat_status>=1 && b.bill_status <= 5" class="action-btn" @click="nextSeatStatusBtn(b.seat_id)">
                                {{ seatStatus[b.seat_status + 1] }}
                            </button>
                            <button v-if="b.seat_status === 1 && b.bill_status < 5" class="cancel-btn" @click="cancelSeatBtn(b.seat_id)">
                                Cancel
                            </button>
                            <button v-else-if="b.seat_status === 4" class="action-btn" @click="resetSeatStatus(b.seat_id)">
                                Reset
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
export default {
    name: 'Dashboard',

    data() {
        return {
            avaiableStatus: ["cancel", "confirmed", "preparing", "checking", "serving", "delivered", "completed"],
            seatStatus: ["none/cancel", "use", "used", "cleaning", "cleaned"],
            allBills: [],
            showOrderDetails: false,
            sendId: undefined,
            interval: "",
        }
    },

    created() {
        this.getAllBills();
        if (!this.admin) {
            this.$router.push("/");
        }
    },

    mounted: function () {
        this.autoUpdate();
    },

    beforeUnmount() {
        clearInterval(this.interval)
    },

    computed: {
        ...mapState(["allFoods", "admin", "staff"]),

        filterBills: function () {
            if (!this.allBills) {
                return [];
            }
            return this.allBills.filter((b) => b.bill_status <= 6 && b.bill_status > 0);
        },
    },

    methods: {
        ...mapMutations(["setStaff"]),
        ...mapMutations(["setAdmin"]),

        async getAllBills() {
            this.allBills = (await axios.get('/billstatus')).data;
        },

        /* async getTodayOrders() {
            try {
                const response = this.allBills = (await axios.get('/billstatus/today')).data;
                this.allBills = response.data;
            } catch (error) {
                console.error("Error fetching today's orders:", error);
            }
        }, */

        sendBillId: function (id) {
            this.sendId = id
            this.showOrderDetails = !this.showOrderDetails;
        },

        closeView: function () {
            this.showOrderDetails = !this.showOrderDetails;
        },

        handleLogout: function () {
            this.setAdmin("");
            this.setStaff("");
        },

        async nextStatusBtn(id) {
            await axios.put('/billstatus/' + id);
            this.getAllBills();
        },

        async paidBtn(id) {
            await axios.put('/billstatus/paid/' + id);
            this.getAllBills();
        },

        async cancelBtn(id) {
            await axios.put('/billstatus/cancel/' + id);
            this.getAllBills();
        },

        autoUpdate: function () {
            this.interval = setInterval(function () {
                this.getAllBills();
            }.bind(this), 5000);
        },

        async nextSeatStatusBtn(id) {
            await axios.put('/seats/status/' + id);
            this.getAllBills();
        },

        async cancelSeatBtn(id) {
            await axios.put('/seats/restatus/' + id);
            this.getAllBills();
        },

        async resetSeatStatus(id) {
            await axios.put('/seats/restatus/' + id);
            this.getAllBills();
        },

    },
}
</script>

<style scoped>
.admin-container {
    background-color: #fff;
    height: 100vh;
    padding: 2rem 9%;
    font-size: 16px;
}

.project-list>tbody>tr>td {
    padding: 12px 8px;
}

.project-list>tbody>tr>td .avatar {
    width: 22px;
    border: 1px solid #CCC;
}

.table-responsive {
    margin-top: 8vh;
}

.action-btn,
.cancel-btn,
.paid-btn {
    width: 100px;
    height: 25px;
    color: white;
    text-transform: capitalize;
}

.action-btn {
    background-color: #0da9ef;
    margin-right: 10px;
}

.cancel-btn,
.paid-btn {
    background-color: red;
}

.action-btn:hover {
    background-color: #27ae60;
}
</style>