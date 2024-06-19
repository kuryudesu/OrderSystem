<template>
    <div class="checkout-container">
        <div class="checkout-form-container">
            <form id="checkoutForm" @submit="handleSubmit" novalidate autocomplete="off">
                <div class="checkout-heading">
                    <h3>再幾個步驟即可送出訂單<span>Total</span></h3>
                    <h3 v-if="user">{{ user.user_name }}'s 訂單<span>${{ calculateSummaryPrice()[3] }}</span></h3>
                    <button class="detail-btn"  @click.prevent="openModal1">明細</button>
                </div>
                <div class="modal" :class="{ 'open': isModalOpen1 }" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
                        <div class="modal-content" style="height: 100%; width: 100%;">
                            <div class="modal-header">
                                <span class="close" @click="closeModal1">&times;</span>
                            </div>
                            <div class="modal-body">
                                <h1>購物車明細</h1>
                                <div v-for="(f, index) in filterFoods" :key="index">
                                    <div class="box-content row">
                                        <div class="image-box col-sm-3" style="padding-left: 0;">
                                            <img :src="require(`../assets/images/${f.food_src}`)" alt=""
                                                class="cart-product-img" />
                                        </div>

                                        <div class="desc col-sm-4">
                                            <h2 class="item-name">{{ f.food_name }}</h2>
                                            <div class="item-desc">
                                                <b>Description</b>
                                                <p>{{ f.food_desc }}</p>
                                            </div>
                                        </div>

                                        <div class="item-price col-sm-1">
                                            <span class="sale-price">${{ parseFloat(f.food_price) -
                                                parseFloat(f.food_discount)
                                            }}</span>
                                            <p class="text-muted first-price"
                                                v-if="parseFloat(f.food_discount) != 0.00">
                                                ${{
                                                    parseFloat(f.food_price)
                                                }}

                                            </p>
                                        </div>

                                        <div class="item-qty col-sm-2 d-inline">
                                            <label for="iQuantity"
                                            style="font-size: 12px; padding-right: 2px;">Quantity:</label>
                                            <input type="number" id="iQuantity" class="control item-quantity"
                                                :value="itemQuantity[index]" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">

                            </div>
                        </div>
                    </div>
                </div>
                <!--  -->

                <div class="form-group details-group">
                    <div class="form-group">
                        <h2>已選座位</h2>
                        <p v-if="selectedSeat">{{ selectedSeat.name }}號桌</p>
                        <button class="btn" v-if="buttonVisible" @click.prevent="openModal">選擇座位</button>
                        <div class="modal" :class="{ 'open': isModalOpen }">
                            <div class="modal-content">
                                <span class="close" @click="closeModal">&times;</span>
                                <h1>座位圖</h1>
                                <div class="seating-plan">
                                <div v-for="(row, rowIndex) in seatingRows" :key="rowIndex" class="seating-row">
                                    <div v-for="(seat, seatIndex) in row" :key="seatIndex" @click="selectSeat(seat)" :class="{ 'seat': true, 'selected': seat.selected, 'occupied': seat.occupied }">
                                    <img :src="getSeatImage(seat)" :alt="seat.name">
                                    <span>{{ seat.name }}</span>
                                    </div>
                                </div>
                                </div>
                                <div>
                                <h2>已選座位</h2>
                                <p v-if="selectedSeat">{{ selectedSeat.name }}號桌</p>
                                <p v-else>還沒選擇任何座位</p>
                                </div>
                                <div class="modal-footer">
                                <button v-if="selectedSeat" @click.prevent="saveSelectedSeats" class="btn btn-primary">確認</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-group details-group">
                    <h4>Payment Method</h4>
                    <div class="form-group">
                        <div class="form-group">
                            <input type="radio" name="payment" value="cash" id="paymentCash"
                                v-model="checkoutObj.paymentMethod" /><span>Cash</span>
                            <input type="radio" name="payment" value="card" id="paymentCard"
                                v-model="checkoutObj.paymentMethod" /><span>Card (Visa)</span>
                        </div>
                        <p class="error-mess" v-if="errorObj.payErr.length > 0">{{ errorObj.payErr[0] }}</p>
                    </div>


                    <div v-if="checkoutObj.paymentMethod == 'card'">
                        <div class="form-group">
                            <input type="text" name="coCardNum" placeholder="Enter your card number" id="coCardNum"
                                class="form-control" v-model="cardObj.number" size="16" maxlength="16" />
                            <p class="error-mess" v-if="errorObj.numErr.length > 0">{{ errorObj.numErr[0] }}</p>
                        </div>

                        <div class="form-group">
                            <input v-upcase type="text" name="coCardName" placeholder="Enter the name in your card "
                                id="coCardName" class="form-control" v-model="cardObj.name" />
                            <p class="error-mess" v-if="errorObj.nameErr.length > 0">{{ errorObj.nameErr[0] }}</p>
                        </div>

                        <div class="form-group">
                            <div class="form-control">
                                <span
                                    style="font-size: 1.6rem; position: absolute; margin-left: -5px; margin-top: -11px;">Expiry
                                    Date:
                                </span>
                                <input
                                    style="position: absolute; margin-left: 100px; margin-top: -12px; background: inherit;"
                                    type="month" name="coCardEx" id="coCardEx" v-model="cardObj.expiryDate"
                                    @click="availableTime()" />
                            </div>
                            <p class="error-mess" v-if="errorObj.exDateErr.length > 0">{{ errorObj.exDateErr[0] }}</p>
                        </div>

                        <div class="form-group">
                            <input type="text" name="coCardCvv" placeholder="CVV" id="coCardCvv" class="form-control"
                                v-model="cardObj.cvv" />
                            <p class="error-mess" v-if="errorObj.cvvErr.length > 0">{{ errorObj.cvvErr[0] }}</p>
                        </div>
                    </div>
                </div>

                <div v-if="user" class="form-group">
                    <input type="submit" value="送出 & 付款" class="btn"
                        :disabled="filterFoods.length ? false : true" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
    name: "Checkout",

    data() {
        return {
            checkoutObj: { phone: "", paymentMethod: "" },
            cardObj: { number: "", name: "", expiryDate: "", cvv: "" },
            errorObj: { payErr: [], numErr: [], nameErr: [], exDateErr: [], cvvErr: [] },
            cartItem: [],
            itemQuantity: [],
            isModalOpen: false,
            isModalOpen1: false,
            seatingRows: [
                [
                    { id: 1, name: ' 1', selected: false ,occupied:false},
                    { id: 2, name: ' 2', selected: false ,occupied:false},
                    { id: 3, name: ' 3', selected: false ,occupied:false},
                    { id: 4, name: ' 4', selected: false ,occupied:false},
                    { id: 5, name: ' 5', selected: false ,occupied:false},
                    { id: 6, name: ' 6', selected: false ,occupied:false}
                ],
                [
                    { id: 7, name: ' 7', selected: false ,occupied:false},
                    { id: 8, name: ' 8', selected: false ,occupied:false},
                    { id: 9, name: ' 9', selected: false ,occupied:false},
                    { id: 10, name: ' 10', selected: false ,occupied:false},
                    { id: 11, name: ' 11', selected: false ,occupied:false},
                    { id: 12, name: ' 12', selected: false ,occupied:false}
                ]
            ],
            selectedSeat: null,
            buttonVisible: true,
        }
    },

    created() {
        this.getAllCartItem();
        this.getAllSeat();
        this.getOccupiedSeats();
    },

    computed: {
        ...mapState(["allFoods", "user"]),

        filterFoods: function () {
            return this.allFoods.filter(
                (f) => this.matchID(f, this.cartItem)
            );
        },
    },

    methods: {
        

        availableTime: function () {
            var now = new Date();
            var currentMonth = ("0" + (now.getMonth() + 1)).slice(-2);

            var minRange = now.getFullYear() + "-" + currentMonth;
            var maxRange = (now.getFullYear() + 10) + "-" + currentMonth;

            document.getElementById("coCardEx").setAttribute("min", minRange);
            document.getElementById("coCardEx").setAttribute("max", maxRange);
        },

        matchID: function (food, cartArray) {
            let temp = "";
            cartArray.forEach(element => {
                if (parseInt(food.food_id) == element) {
                    temp = food
                }
            });
            return temp
        },

        openModal() {
        this.isModalOpen = true;
        },
        closeModal() {
        this.isModalOpen = false;
        },
        openModal1() {
        this.isModalOpen1 = true;
        },
        closeModal1() {
        this.isModalOpen1 = false;
        },

        selectSeat(seat) {
            if (seat.occupied) {
                return;
            }
            // 取消其他座位的选中状态
            this.seatingRows.forEach(row => {
                row.forEach(s => {
                    if (s.id === seat.id) {
                        s.selected = !s.selected;
                        
                        this.selectedSeat = s.selected ? seat : null;
                    } else {
                        s.selected = false;
                    }
                });
            });
            // 设置选中的座位
            this.selectedSeat = seat;
            console.log("seats",seat);
            if (!seat.selected) {
                this.selectedSeat = null;
            }
            
        },

        
        async saveSelectedSeats() {
            if (this.user) {
                if (this.selectedSeat) {
                    let seat = {
                        seat_id: parseInt(this.selectedSeat.id),
                        user_id: parseInt(this.user.user_id)
                    }
                    axios.post(`/seats/${this.selectedSeat.id}`, seat)
                    .then(response => {
                        if (response.status === 200) {
                            console.log('Selected seat saved successfully.');
                            alert("座位儲存成功")
                            this.buttonVisible = false;
                            this.isModalOpen = false;
                        } else {
                            console.error('Error saving selected seat.');
                            
                        }
                    })
                    .catch(error => {
                        console.error('Error saving selected seat:', error);
                        
                    });
                } else {
                    
                    console.log('Please select a seat.');
                    
                }
            } else {
                alert("請登入會員再執行以下動作");
            }
        },

        async getAllSeat() {
            try {
                const response = await axios.get('/seats');
                console.log('Seats data:', response.data);
                // 在这里处理从服务器返回的座位信息，例如更新 UI 或者存储到应用状态中
            } catch (error) {
                console.error('Error fetching seats:', error);
            }
        },
         async getOccupiedSeats() {
             try {
                const response = await axios.get('/seats/occ');
                console.log('Occupied Seats data:', response.data);
                // 如果请求成功，更新座位的状态
                    const occupiedSeats = response.data;
                    if (occupiedSeats) {
                        this.seatingRows.forEach(row => {
                            row.forEach(seat => {
                                const matchingSeat = occupiedSeats.find(occupiedSeat => occupiedSeat.seat_id === seat.id && occupiedSeat.seat_status >= 1 );
                                seat.occupied = matchingSeat ? true : false;
                                console.log("seats",matchingSeat);
                            });
                        });
                        
                    }
            } catch (error) {
                console.error('Error fetching occupied seats:', error);
            } 
        },

        getSeatImage(seat) {
            if (seat.occupied) {
                return require('@/assets/images/seat/occ.png');
            } else if (seat.selected) {
                return require('@/assets/images/seat/select.png');
            } else {
                return require('@/assets/images/seat/non-select.png');
            }
        },

        calculateSummaryPrice: function () {
            let subtotal = 0;
            let discount = 0;
            let serviceFee = 0; // 新增服務費
            let i = 0;
            while (i < this.itemQuantity.length) {
                subtotal = subtotal + parseInt(this.filterFoods[i].food_price) * this.itemQuantity[i];
                discount = discount + parseInt(this.filterFoods[i].food_discount) * this.itemQuantity[i];
                i = i + 1;
            }
            if (!this.filterFoods.length) {
                serviceFee = 0; // 如果沒有商品，服務費也為0
            } else {
                serviceFee = Math.ceil((subtotal-discount) * 0.1); // 一成的服務費
            }
            let total = subtotal - discount + serviceFee; // 加上服務費
            total = Math.ceil(total) // 四捨五入到小數第一位,有尾數就加一

            return [subtotal, discount, serviceFee, total];
        },

        async getAllCartItem() {
            if (this.user) {
                let existItem = await axios.get('/cartItem/' + this.user.user_id);
                existItem.data.forEach(element => {
                    this.cartItem.push(element.food_id);
                    this.itemQuantity.push(element.item_qty);
                });
            }
        },

        resetCheckErr: function () {
            this.errorObj.phoneErr = [];
            this.errorObj.payErr = [];
            this.errorObj.numErr = [];
            this.errorObj.nameErr = [];
            this.errorObj.exDateErr = [];
            this.errorObj.cvvErr = [];
        },

        checkEmptyErr: function () {
            for (var typeErr in this.errorObj) {
                if (this.errorObj[typeErr].length != 0) {
                    return false;
                }
            }
            return true;
        },

        inputUpcase: function (e) {
            e.target.value = e.target.value.toUpperCase()
        },

        checkForm: function () {
            this.resetCheckErr();

            // Phone validate
            /* if (!this.checkoutObj.phone) {
                this.errorObj.phoneErr.push('Entering phone number is required');
            }
            else {
                if (!this.checkoutObj.phone.startsWith('09')) {
                    this.errorObj.phoneErr.push('Phone numbers must start with 09');
                }

                if (this.checkoutObj.phone.length != 10) {
                    this.errorObj.phoneErr.push('Phone numbers must have exactly 10 digits');
                }

                if (!/[0-9]{10}/.test(this.checkoutObj.phone)) {
                    this.errorObj.phoneErr.push('Phone numbers can only contain numbers');
                }
            } */

            // Card validate
            if (!this.checkoutObj.paymentMethod) {
                this.errorObj.payErr.push('請選擇付款方式');
            }
            else if (this.checkoutObj.paymentMethod == "card") {
                if (!this.cardObj.number) {
                    this.errorObj.numErr.push('請輸入卡號');
                }
                else {
                    if (!this.cardObj.number.startsWith('4')) {
                        this.errorObj.numErr.push('Visa card numbers must start with 4');
                    }

                    if (this.cardObj.number.length != 16) {
                        this.errorObj.numErr.push('Visa card numbers must have exactly 16 digits');
                    }

                    if (!/[0-9]{16}/.test(this.cardObj.number)) {
                        this.errorObj.numErr.push('Visa card numbers can only contain numbers');
                    }
                }

                if (!this.cardObj.name) {
                    this.errorObj.nameErr.push('請輸入名字');
                }
                else {
                    if (!/^[A-Za-z\u4E00-\u9FFF]+$/.test(this.cardObj.name.replace(/\s/g, ""))) {
                        this.errorObj.nameErr.push('請輸入有效姓名');
                    }
                }

                if (!this.cardObj.expiryDate) {
                    this.errorObj.exDateErr.push('請選擇卡片到期日');
                }


                if (!this.cardObj.cvv) {
                    this.errorObj.cvvErr.push('請輸入CVV');
                }
                else {
                    if (this.cardObj.cvv.length != 3) {
                        this.errorObj.cvvErr.push('CVV為三位數號罵');
                    }

                    if (!/[0-9]{3}/.test(this.cardObj.cvv)) {
                        this.errorObj.cvvErr.push('CVV必須為數字');
                    }
                }
            } else if (this.checkoutObj.paymentMethod == "cash") {
                this.cardObj.name = "";
                this.cardObj.expiryDate = "";
                this.cardObj.cvv = "";

                this.errorObj.numErr = [];
                this.errorObj.nameErr = [];
                this.errorObj.exDateErr = [];
                this.errorObj.cvvErr = [];
            }
        },

        isPaid: function () {
            if (this.checkoutObj.paymentMethod == "cash") {
                return "false"
            }
            else if (this.checkoutObj.paymentMethod == "card") {
                return "true"
            }
        },

        async sendBillDetails(billId, foodId, qty) {
            let billDetails = {
                bill_id: parseInt(billId),
                food_id: parseInt(foodId),
                item_qty: parseInt(qty)
            }

            await axios.post("/billdetails", billDetails);
        },

        async handleSubmit(e) {
            this.checkForm();

            if (!this.checkEmptyErr()) {
                e.preventDefault();
            } else {
                e.preventDefault();
                let billId = (await axios.get("/billstatus/new")).data;

                if (billId == "") {
                    billId = 1
                } else {
                    billId = parseInt(billId.bill_id) + 1
                }

                this.cartItem.forEach((foodId, index) => {
                    this.sendBillDetails(billId, foodId, this.itemQuantity[index])
                });

                var now = new Date();
                var day = ("0" + now.getDate()).slice(-2);
                var month = ("0" + (now.getMonth() + 1)).slice(-2);
                var hour = ("0" + (now.getHours())).slice(-2);
                var min = ("0" + (now.getMinutes())).slice(-2);
                var currentTime = now.getFullYear() + "-" + month + "-" + day + "T" + hour + ":" + min;

                let billStatus = {
                    bill_id: parseInt(billId),
                    user_id: parseInt(this.user.user_id),
                    seat_id: parseInt(this.selectedSeat.id),
                    bill_when: currentTime,
                    bill_method: this.checkoutObj.paymentMethod,
                    bill_discount: parseInt(this.calculateSummaryPrice()[1]),
                    bill_delivery: parseInt(this.calculateSummaryPrice()[2]),
                    bill_total: parseInt(this.calculateSummaryPrice()[3]),
                    bill_paid: this.isPaid(),
                    bill_status: 1
                    
                }

                axios.post("/billstatus", billStatus);
                axios.delete("/cartItem/" + this.user.user_id);

                this.cartItem = [];
                this.itemQuantity = [];

                this.$router.push("/thank");

            }
        }
    }
};
</script>

<script setup>
// enables v-focus in templates
const vUpcase = {
    mounted(el) {
        el.style.textTransform = "uppercase";
    }
}
</script>

<style scoped>
.checkout-container {
    padding: 2rem 9%;
}

.checkout-container .checkout-form-container {
    background: #fff;
    height: 90vh;
}

.checkout-container .checkout-form-container form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -42%);
    max-width: 70rem;
    width: 100%;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
    border: 0.1rem solid rgba(0, 0, 0, 0.2);
    padding: 2rem;
    border-radius: 0.5rem;
    animation: fadeUp 0.4s linear;
}

.checkout-container .checkout-form-container form h3 {
    padding-bottom: 1rem;
    font-size: 2rem;
    text-transform: uppercase;
    color: #130f40;
    margin: 0;
}

.checkout-container .checkout-form-container form .form-control {
    margin: 0.7rem 0;
    border-radius: 0.5rem;
    background: #f7f7f7;
    padding: 2rem 1.2rem;
    font-size: 1.6rem;
    color: #130f40;
    text-transform: none;
    width: 100%;
    border: none;
}

.checkout-container .checkout-form-container form label {
    font-size: 2rem;
    margin: 0;
    padding: 0;
}

.checkout-container .checkout-form-container form span {
    font-size: 18px;
    padding-left: 5px;
    padding-right: 40px;
}

.checkout-container .checkout-form-container form .btn {
    margin: 1rem 0;
    width: 100%;
    text-align: center;
}

.checkout-container .checkout-form-container form .detail-btn {
    width: 15%;
    text-align: center;
    padding: .7rem 1.8rem;
    font-size: 1.7rem;
    cursor: pointer;
    color: #fff;
    background: #7accc8;
    border-radius: .5rem;
}

.checkout-container .checkout-form-container form .detail-btn:hover {
    background-color: #275EFE;
    color: #fff;
}

.checkout-container .checkout-form-container form .detail-btn:disabled {
    background-color: #130f40 !important;
    color: #fff;
}


.checkout-container .checkout-form-container form p {
    padding-top: 1rem;
    font-size: 1.5rem;
    color: #666;
    margin: 0;
}

.checkout-container .checkout-form-container form p a {
    color: #27ae60;
}

.checkout-container .checkout-form-container form p a:hover {
    color: #130f40;
    text-decoration: underline;
}

.checkout-container .checkout-form-container form .form-group {
    margin: 0;
}

.checkout-container .checkout-form-container form .form-group.details-group {
    margin-top: 40px;
}

.checkout-container .checkout-form-container form .form-group .error-mess {
    font-size: 1.5rem;
    position: relative;
    color: rgb(243, 47, 47);
    margin: 0;
    padding: 0;
}

.checkout-container .checkout-form-container form .checkout-heading h3 {
    display: flex;
    justify-content: space-between;
}

.checkout-container .checkout-form-container form .checkout-heading h3 span {
    padding-right: 0px;
    color: #f38609;
}

.checkout-container .checkout-form-container form .checkout-heading h3:first-of-type span {
    padding-right: 0px;
    color: #130f40;
}

.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.open {
    display: block;
}


.seating-plan {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.seating-row {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    flex-wrap: wrap;
}

.seat {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 5px;
}

.seating-row img {
    margin: 3px 3px;
    width: 40px;
    height: 40px;
}



.shopping-cart-section {
    background: #fff;
    padding: 2rem 9%;
}

.item-name {
    color: #27ae60
}

.cart-product-img {
    text-align: center;
    height: 125px;
    object-fit: cover;
    background-color: #f7f7f7;

}
.box-content {
    background-color: inherit;
    color: inherit;
    padding: 15px 20px 20px 20px;
    border-color: #e7eaec;
    border-image: none;
    border-style: solid solid none;
    border-width: 1px 0;

}

.item-desc b {
    font-size: 12px;
}

.item-desc p {
    font-size: 10px;
}

.sale-price,
.first-price,
.item-quantity {
    font-size: 12px;
}

.item-quantity {
    width: 60px;
    height: 15px;
    text-align: center;
}

.control{
    margin: 0.7rem 0;
    border-radius: 0.5rem;
    background: #f7f7f7;
    padding: 2rem 1.2rem;
    font-size: 1.6rem;
    color: #130f40;
    text-transform: none;
    border: none;
}

.first-price {
    text-decoration: line-through;
}

@media (max-width: 768px) {
    .box-content .item-name {
        font-size: 14px;
    }

    .box-content{
        display: block;
    }
}
@media (max-width: 576px) {

.image-box {
    opacity: 0.8;
    filter: brightness(60%);
    padding: none;
}

.image-box img {
    border-radius: 15px;

}

.in-cart .box-content {
    color: white;
    margin-left: -25px;
    border: none;
    display: flex;
}

.desc .item-name {
    font-size: 16px;
    filter: brightness(160%);
}

.desc b {
    font-size: 10px;
}

.desc p {
    font-size: 12px;
}

.desc .remove-btn {
    font-size: 10px;
    position: relative;

}

.item-price {
    position: absolute;
    margin-top: 55px;
}

.item-price .first-price {
    display: inline;
    padding-left: 5px;
    color: red !important;
}

.item-qty {
    width: 50px;
    margin-top: 55px;
    padding-left: 160px;
}

.cal-total {
    display: none;
}

.in-cart .box-content .check-out-btn {
    display: none;
}

}
</style>
