<template>
    <div class="menu-section">
        <div class="heading">
            <span>MENU</span>
        </div>

        <div class="row">
            <div class="col-sm-4 col-12 filter-box">
                <div class="row search-box">
                    <input type="text" class="search-input" v-model="foodObj.name" placeholder="請輸入.." />
                </div>

                <div class="row filter-drop-down">
                    <p @click="displayFilterDrop">篩選<span v-if="showDropDown">x</span><span v-else>v</span></p>
                </div>

                <div class="row filter-heading">
                    <h1>類型</h1>
                </div>

                <div class="row filter-section">
                    <ul class="filter-option">
                        <li>
                            <input type="button" name="cbStatus" id="bsStatus" value="Best Seller" hidden
                                @click="filterStatusBtn($event)" />
                            <label for="bsStatus" class="d-flex justify-content-between">暢銷
                                <button class="unselect-btn" @click="unselectStatusBtn($event)"
                                    value="Best Seller">X</button></label>
                        </li>

                        <li>
                            <input type="button" name="cbStatus" id="soStatus" value="Sale Off" hidden
                                @click="filterStatusBtn($event)" />
                            <label for="soStatus" class="d-flex justify-content-between">優惠 <button
                                    class="unselect-btn" @click="unselectStatusBtn($event)"
                                    value="Sale Off">X</button></label>
                        </li>


                        <li>
                            <input type="button" name="cbStatus" id="sdStatus" value="Seasonal Dishes" hidden
                                @click="filterStatusBtn($event)" />
                            <label for="sdStatus" class="d-flex justify-content-between">季節性餐點 <button
                                    class="unselect-btn" @click="unselectStatusBtn($event)"
                                    value="Seasonal Dishes">X</button></label>
                        </li>


                        <li>
                            <input type="button" name="cbStatus" id="ndStatus" value="New Dishes" hidden
                                @click="filterStatusBtn($event)" />
                            <label for="ndStatus" class="d-flex justify-content-between">最新餐點 <button
                                    class="unselect-btn" @click="unselectStatusBtn($event)"
                                    value="New Dishes">X</button></label>
                        </li>

                    </ul>
                    <hr />
                </div>

                <div class="row filter-heading">
                    <h1>價格</h1>
                </div>

                <div class="row filter-section">
                    <ul class="filter-option">
                        <li>
                            <input type="button" name="rPrice" id="rtfPrice" value="30,50" hidden
                                @click="filterPriceBtn($event)" />
                            <label for="rtfPrice" class="d-flex justify-content-between">$30 - $50 <button
                                    class="unselect-btn" @click="unselectPriceBtn($event)">X</button></label>
                        </li>

                        <li>
                            <input type="button" name="rPrice" id="rftPrice" value="50,80" hidden
                                @click="filterPriceBtn($event)" />
                            <label for="rftPrice" class="d-flex justify-content-between">$50 - $80 <button
                                    class="unselect-btn" @click="unselectPriceBtn($event)">X</button></label>
                        </li>

                        <li>
                            <input type="button" name="rPrice" id="rttPrice" value="80,100" hidden
                                @click="filterPriceBtn($event)" />
                            <label for="rttPrice" class="d-flex justify-content-between">$80 - $100 <button
                                    class="unselect-btn" @click="unselectPriceBtn($event)">X</button></label>
                        </li>

                        <li>
                            <input type="button" name="rPrice" id="mtPrice" value="100" hidden
                                @click="filterPriceBtn($event)" />
                            <label for="mtPrice" class="d-flex justify-content-between">{{ ">" }} $100 <button
                                    class="unselect-btn" @click="unselectPriceBtn($event)">X</button></label>
                        </li>

                        <!-- <li>
                            <input type="button" name="rPrice" id="ltPrice" value="30" hidden
                                @click="filterPriceBtn($event)" />
                            <label for="ltPrice" class="d-flex justify-content-between">{{ "<" }} $30 <button
                                    class="unselect-btn" @click="unselectPriceBtn($event)">X</button></label>
                        </li> -->

                    </ul>
                    <hr />
                </div>


                <div class="row filter-heading">
                    <h1>葷素食</h1>
                </div>

                <div class="row filter-section">
                    <ul class="filter-option">
                        <li>
                            <input type="button" name="rType" id="mType" value="meat" hidden
                                @click="filterTypeBtn($event)" />
                            <label for="mType" class="d-flex justify-content-between">葷食<button class="unselect-btn"
                                    @click="unselectTypeBtn($event)">X</button></label>
                        </li>

                        <li>
                            <input type="button" name="rType" id="vType" value="vegan" hidden
                                @click="filterTypeBtn($event)" />
                            <label for="vType" class="d-flex justify-content-between">素食<button class="unselect-btn"
                                    @click="unselectTypeBtn($event)">X</button></label>
                        </li>

                    </ul>
                </div>
            </div>

            <div class="col-sm-8">
                <div class="row">
                    <div class="menu-tabs">
                        <input type="button" id="allFilterFoodBtn" name="allFilterFoodBtn" value="all"
                            class="menu-tab-item" @click="filterFoodBtn($event)" />
                        <input type="button" id="riceFilterFoodBtn" name="riceFilterFoodBtn" class="menu-tab-item"
                            value="飯" @click="filterFoodBtn($event)" />
                        <input type="button" id="noodleFilterFoodBtn" name="noodleFilterFoodBtn" class="menu-tab-item"
                            value="麵" @click="filterFoodBtn($event)" />
                        <input type="button" id="othersFilterFoodBtn" name="othersFilterFoodBtn" class="menu-tab-item"
                            value="其他" @click="filterFoodBtn($event)" />
                        <input type="button" id="sidesFilterFoodBtn" name="sidesFilterFoodBtn" class="menu-tab-item"
                            value="小菜" @click="filterFoodBtn($event)" />
                        <input type="button" id="dessertFilterFoodBtn" name="dessertFilterFoodBtn" class="menu-tab-item"
                            value="甜點" @click="filterFoodBtn($event)" />
                        <input type="button" id="drinkFilterFoodBtn" name="drinkFilterFoodBtn" class="menu-tab-item"
                            value="飲料" @click="filterFoodBtn($event)" />
                    </div>
                </div>

                <div class="row box-container">
                    <div v-for="(f, index) in currentPageItems" :key="index">
                        <div class="box">
                            <!-- <a href="" class="fas fa-heart"></a> -->
                            <div class="image">
                                <img :src="require(`../assets/images/${f.food_src}`)" alt="" />
                            </div>
                            <div class="content">
                                <h3>{{ f.food_name }}</h3>
                                <!-- <div class="stars">
                                    <div v-for="s in Math.floor(parseFloat(f.food_star))" :key="s" class="d-inline">
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <div v-if="parseFloat(f.food_star) - Math.floor(parseFloat(f.food_star)) == 0.5"
                                        class="d-inline">
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                    <span> ({{ f.food_vote }}) </span>
                                </div> -->
                                <div class="desc">
                                    <p>{{ f.food_desc }}</p>
                                </div>
                                <div class="price">
                                    ${{ parseFloat(f.food_price) - parseFloat(f.food_discount) }}
                                    <span v-if="parseFloat(f.food_discount) != 0.00">${{ parseFloat(f.food_price)
                                    }}</span>
                                </div>
                                <button class="add-to-cart" @click="addItem(index)">
                                    <div class="default">加入購物車</div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-if="!filterFoods.length">
                        <div class="box">
                            <div class="content">
                                <h1 style="color: #057835fa;">無餐點!</h1>
                            </div>
                            <div class="image">
                                <img src="../assets/images/notfound.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="calculatePages > 1" class="action-row">

                    <button v-if="pageNum != 0" @click="previous()" class="action-btn"> {{ "上一頁" }} </button>
                            <div v-for="(p, i) in calculatePages" :key="i" class="d-inline">
                                <span v-if="i == pageNum" class="highlight" @click="set(i)">{{ i + 1 }}</span>
                                <span v-else @click="set(i)">{{ i + 1 }}</span>
                            </div>
                            <button v-if="pageNum != calculatePages - 1" @click="next()" class="action-btn"> {{ "下一頁" }}
                            </button>
                </div>
            </div>
        </div>

        <QuickView v-if="showQuickView" :food="sendId">
            <button class="btn" @click="closeView">X</button>
        </QuickView>
    </div>
</template>

<script>
import QuickView from "@/components/QuickView.vue";
import { mapState } from "vuex";
export default {
    name: "Menu",

    data() {
        return {
            foodObj: { name: "", category: "", status: [], price: "", type: "" },

            showQuickView: false,
            showDropDown: false,
            sendId: null,

            perPage: 6,
            pageNum: 0,
            previousCategoryClicked: "",
            previousPriceClicked: "",
            previousTypeClicked: "",
        };
    },

    computed: {
        ...mapState(["allFoods"]),

        filterFoods: function () {
            return this.allFoods.filter((f) => f.food_name.toLowerCase().match(this.foodObj.name.toLowerCase()) &&
                (f.food_category.match(this.foodObj.category) || this.foodObj.category == "all" || this.foodObj.category == "") &&
                (this.evaluatePrice(f, this.foodObj.price)) &&
                f.food_type.toLowerCase().match(this.foodObj.type.toLowerCase()) &&
                (this.evaluateStatus(f, this.foodObj.status)));
        },
        currentPageItems: function () {
            return this.filterFoods.slice(this.pageNum * this.perPage, this.pageNum * this.perPage + this.perPage);
        },
        calculatePages: function () {
            if (this.filterFoods.length % this.perPage != 0) {
                return Math.floor((this.filterFoods.length) / this.perPage) + 1;
            }
            else {
                return this.filterFoods.length / this.perPage;
            }
        }
    },
    methods: {
        set(val) {
            this.pageNum = val;
            window.scrollTo({ top: 90, behavior: 'smooth' });
        },
        next() {
            this.pageNum++;
            window.scrollTo({ top: 90, behavior: 'smooth' });
        },
        previous() {
            this.pageNum--;
            window.scrollTo({ top: 90, behavior: 'smooth' });
        },
        checkSale: function (food, statusArray) {
            if (statusArray.includes("Sale Off")) {
                if (parseFloat(food.food_discount) > 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
            return true;
        },
        checkBest: function (food, statusArray) {
            if (statusArray.includes("Best Seller")) {
                if (food.food_status.includes("best seller")) {
                    return true;
                }
                else {
                    return false;
                }
            }
            return true;
        },
        checkSeason: function (food, statusArray) {
            if (statusArray.includes("Seasonal Dishes")) {
                if (food.food_status.includes("seasonal dishes")) {
                    return true;
                }
                else {
                    return false;
                }
            }
            return true;
        },
        checkNew: function (food, statusArray) {
            if (statusArray.includes("New Dishes")) {
                if (food.food_status.includes("new dishes")) {
                    return true;
                }
                else {
                    return false;
                }
            }
            return true;
        },
        evaluateStatus: function (food, statusArray) {
            this.pageNum = 0;
            if (statusArray.length != 0) {
                if (this.checkSale(food, statusArray) && this.checkBest(food, statusArray) && this.checkNew(food, statusArray) && this.checkSeason(food, statusArray)) {
                    return food;
                }
            }
            else {
                return food;
            }
        },
        evaluatePrice: function (food, priceRange) {
            this.pageNum = 0;
            var cal = parseFloat(food.food_price) - parseFloat(food.food_discount);
            if (priceRange == "30,50") {
                if (30 <= cal && cal <= 50) {
                    return food;
                }
            }
            else if (priceRange == "50,80") {
                if (50 <= cal && cal <= 80) {
                    return food;
                }
            }
            else if (priceRange == "80,100") {
                if (80 <= cal && cal <= 100) {
                    return food;
                }
            }
            else if (priceRange == "30") {
                if (cal <= 30) {
                    return food;
                }
            }
            else if (priceRange == "100") {
                if (cal >= 100) {
                    return food;
                }
            }
            else if (priceRange == "") {
                return food;
            }
        },
        filterFoodBtn: function (e) {
            this.pageNum = 0;
            if (this.foodObj.category != e.target.value && this.previousCategoryClicked != "") {
                this.previousCategoryClicked.target.style.background = "#7accc8";
            }
            this.foodObj.category = e.target.value;
            this.previousCategoryClicked = e;
            e.target.style.background = "#275EFE";
        },
        filterStatusBtn: function (e) {
            this.pageNum = 0;
            if (this.foodObj.status.includes(e.target.value) == false) {
                this.foodObj.status.push(e.target.value);
                document.querySelector(`[for=${e.target.id}]`).style.background = "#7accc8";
                document.querySelector(`[for=${e.target.id}]`).style.color = "white";
                document.querySelector(`[for=${e.target.id}]`).querySelector(":scope > button").style.display = "block";
            }
        },
        filterPriceBtn: function (e) {
            this.pageNum = 0;
            this.foodObj.price = "";
            this.foodObj.price += e.target.value;
            document.querySelector(`[for=${e.target.id}]`).style.background = "#7accc8";
            document.querySelector(`[for=${e.target.id}]`).style.color = "white";
            document.querySelector(`[for=${e.target.id}]`).querySelector(":scope > button").style.display = "block";
            if (this.previousPriceClicked != "") {
                document.querySelector(`[for=${this.previousPriceClicked.target.id}]`).style.background = "inherit";
                document.querySelector(`[for=${this.previousPriceClicked.target.id}]`).style.color = "inherit";
                document.querySelector(`[for=${this.previousPriceClicked.target.id}]`).querySelector(":scope > button").style.display = "none";
            }
            this.previousPriceClicked = e;
        },
        filterTypeBtn: function (e) {
            this.pageNum = 0;
            this.foodObj.type = "";
            this.foodObj.type += e.target.value;
            document.querySelector(`[for=${e.target.id}]`).style.background = "#7accc8";
            document.querySelector(`[for=${e.target.id}]`).style.color = "white";
            document.querySelector(`[for=${e.target.id}]`).querySelector(":scope > button").style.display = "block";
            if (this.previousTypeClicked != "") {
                document.querySelector(`[for=${this.previousTypeClicked.target.id}]`).style.background = "inherit";
                document.querySelector(`[for=${this.previousTypeClicked.target.id}]`).style.color = "inherit";
                document.querySelector(`[for=${this.previousTypeClicked.target.id}]`).querySelector(":scope > button").style.display = "none";
            }
            this.previousTypeClicked = e;
        },
        unselectStatusBtn: function (e) {
            this.pageNum = 0;
            this.foodObj.status = this.foodObj.status.filter(function (a) { return a !== e.target.value; });
            e.target.parentNode.style.background = "inherit";
            e.target.parentNode.style.color = "inherit";
            e.target.parentNode.querySelector(":scope > button").style.display = "none";
        },
        unselectPriceBtn: function () {
            this.pageNum = 0;
            this.foodObj.price = "";
            document.querySelector(`[for=${this.previousPriceClicked.target.id}]`).style.background = "inherit";
            document.querySelector(`[for=${this.previousPriceClicked.target.id}]`).style.color = "inherit";
            document.querySelector(`[for=${this.previousPriceClicked.target.id}]`).querySelector(":scope > button").style.display = "none";
            this.previousPriceClicked = "";
        },
        unselectTypeBtn: function () {
            this.pageNum = 0;
            this.foodObj.type = "";
            document.querySelector(`[for=${this.previousTypeClicked.target.id}]`).style.background = "inherit";
            document.querySelector(`[for=${this.previousTypeClicked.target.id}]`).style.color = "inherit";
            document.querySelector(`[for=${this.previousTypeClicked.target.id}]`).querySelector(":scope > button").style.display = "none";
            this.previousTypeClicked = "";
        },
        addItem: function (index) {
            this.sendId = parseInt(this.currentPageItems[index].food_id);
            this.showQuickView = !this.showQuickView;
        },

        closeView: function () {
            this.showQuickView = !this.showQuickView;
        },

        displayFilterDrop: function () {
            let divControl1 = document.getElementsByClassName("filter-heading");
            let divControl2 = document.getElementsByClassName("filter-section");
            for (var i = 0; i < divControl1.length; i++) {
                if (this.showDropDown) {
                    divControl1[i].style.display = "none";
                    divControl2[i].style.display = "none";
                }
                else {
                    divControl1[i].style.display = "block";
                    divControl2[i].style.display = "block";
                }
            }
            this.showDropDown = !this.showDropDown;
        }

    },
    components: { QuickView }
};
</script>

<style scoped>
input[type="button"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
}

.add-to-cart {
  --color: #fff;
  --icon: var(--color);
  --cart: #fff;
  --dots: #fff;
  --background: #275EFE;
  --shadow: rgba(0, 9, 61, 0.16);
  cursor: pointer;
  position: relative;
  outline: none;
  border: none;
  -webkit-tap-highlight-color: transparent;
  font-size: 16px;
  border-radius: 22px;
  padding: 12px 32px;
  font-weight: 500;
  line-height: 20px;
  transform: scale(var(--s, 0.97));
  box-shadow: 0 var(--s-y, 4px) var(--s-b, 12px) var(--shadow);
  color: var(--color);
  background: var(--background);
  transition: transform 0.3s, box-shadow 0.3s;
}
.add-to-cart .default {
  padding-left: 16px;
  position: relative;
  opacity: var(--o, 1);
  transform: scale(var(--s, 1));
  transition: transform 0.3s, opacity 0.3s;
  transition-delay: var(--d, 0.3s);
}
.add-to-cart .default:before, .add-to-cart .default:after {
  content: "";
  width: 2px;
  height: 12px;
  left: 0;
  top: 4px;
  border-radius: 1px;
  background: var(--icon);
  position: absolute;
  transform: rotate(var(--r, 0deg));
  transition: transform 0.25s;
}
.add-to-cart .default:after {
  --r: 90deg;
}
.add-to-cart:hover {
  --s: 1;
  --s-y: 8px;
  --s-b: 20px;
}

.unselect-btn:active,
.unselect-btn:focus,
.action-btn:active,
.action-btn:focus {
    border: none;
    outline: none;
}

hr {
    border-top: 3px solid #1f5350;
    width: 100%;
}

.unselect-btn {
    background: transparent;
    padding-right: 10px;
    cursor: pointer;
    color: inherit;
    display: none;
}


.filter-section {
    width: inherit;
}

.filter-heading {
    padding-top: 30px;
}

.filter-heading h1 {
    color: #7accc8;
}

.filter-option {
    list-style-type: none;
    width: inherit;
}

.filter-option label {
    width: 100%;
    font-size: 15px;
    padding: 3px 0px;
    border-radius: 5px;
}

.filter-option label:hover {
    color: white;
    background-color: #275EFE !important;
    transition: all 0.5s ease;
    border-radius: 5px;
}

.search-box {
    width: 100%;
    justify-content: center;
    position: relative;
    display: flex;

}

.search-input {
    margin: 0;
    width: 100%;
    height: 40px;
    font-size: 20px;
    color: white;
    background:#1f5350;
    border-radius: 40px;
}

input[type="text"]{
    padding:10px 15px 10px 50px;
    font-size:36px;
    color:#1f5350;
/*removing boder from search box*/
    border:none;
/*defining background image as a search symbol*/
    background-image:url(data:image/png;base64,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);
    background-repeat:no-repeat;
/*background-size*/
-webkit-background-size:35px 35px;
   -moz-background-size:35px 35px;
     -o-background-size:35px 35px;
        background-size:35px 35px;
/*positioning background image*/
    background-position:8px 2px;
/*changing background color form white*/
    background-color:#7accc8;
}



::placeholder {
    color: #b1e0de;
}

.menu-section {
    padding: 2rem 9%;
}

.menu-section .menu-tabs {
    margin-bottom: 30px;
    flex: 0 0 100%;
    max-width: 100%;
    text-align: center;
    background-color: #7accc8;
    border-radius: 10px;
}

.menu-section .menu-tabs .menu-tab-item {
    display: inline-block;
    cursor: pointer;
    padding: 5px 30px;
    border-radius: 10%;
    font-size: 20px;
    color: whitesmoke;
    font-weight: 500;
    text-transform: capitalize;
    transition: all 0.3s ease;
    margin: 0;
}

.menu-section .menu-tabs .menu-tab-item:hover {
    background-color: #275EFE !important;
}

.menu-section .menu-tabs .menu-tab-item p {
    padding: none;
    margin: none;
}

.menu-section .box-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    gap: 1.5rem;
}

.menu-section .box-container .box {
    border-radius: 0.5rem;
    position: relative;
    background: #f7f7f7;
    padding: 2rem;
    text-align: center;
}

.menu-section .box-container .box .fa-heart {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 2.5rem;
    color: #666;
    cursor: pointer;
}

.menu-section .box-container .box .fa-heart:hover {
    color: #DC143C;
}

.menu-section .box-container .box .image {
    margin: 1rem 0;
}

.menu-section .box-container .box .image img {
    height: 15rem;
}

.menu-section .box-container .box .content h3 {
    font-size: 2rem;
    color: #130f40;
}

.menu-section .box-container .box .content .stars {
    padding: 1rem 0;
    font-size: 1.7rem;
}

.menu-section .box-container .box .content .stars i {
    color: gold;
}

.menu-section .box-container .box .content .stars span {
    color: #666;
}

.menu-section .box-container .box .content .desc p {
    font-size: 14px;
    margin: 0;
}

.menu-section .box-container .box .content .price {
    font-size: 2rem;
    color: #130f40;
}

.menu-section .box-container .box .content .price span {
    font-size: 1.5rem;
    color: #666;
    text-decoration: line-through;
}

.menu-section .action-row {
    padding-top: 30px;
    width: 100%;
    text-align: center;
    font-size: 20px;
}

.menu-section .action-row .action-btn {
    background-color: #7accc8;
    padding: 3px;
    border: 2px solid #7acce2;
    border-radius: 20%;
    color: white;
}

.menu-section .action-row span {
    margin-right: 15px;
}

.menu-section .action-row span:hover {
    cursor: pointer;
}

.menu-section .action-row span.highlight {
    color: #275EFE;
}

.menu-section .action-row span:first-of-type {
    margin-left: 15px;
}

.filter-drop-down {
    display: none;
}

@media (min-width: 576px) {

    .filter-heading,
    .filter-section {
        display: block !important;
    }
}

@media (max-width: 768px) {
    .menu-section .box-container {

        grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
        gap: 1rem;
    }

    .menu-section .box-container .box .content h3 {
        height: 4rem;
    }
}

@media (max-width: 576px) {

    .search-box,
    .filter-heading,
    .filter-section {
        width: auto;
    }

    .filter-option {
        width: 100%;
    }

    .filter-drop-down {
        display: block;
        background-color: #7accc8;
        color: white;
        font-weight: 400;
        margin-bottom: 15px;
        margin-top: 15px;
        border-radius: 12px;

    }

    .filter-drop-down p {
        font-size: 20px;
        padding: 5px 0px;
        margin: 0;
        display: flex;
        justify-content: space-between;
    }

    .filter-drop-down p span {
        font-size: 20px;
        padding-right: 10px;
        text-transform: lowercase;
        font-weight: 300;
    }

    .filter-heading,
    .filter-section {
        display: none;
    }

    .menu-tabs .menu-tab-item {
        font-size: 12px !important;
        padding: 5px 20px !important;
    }

    .menu-section .action-row {
        font-size: 16px !important;
    }

    .menu-section .action-row span {
        margin-right: 5px;
    }

    .menu-section .box-container .box .image img {
        height: 10rem;
    }

    .menu-section .box-container .box .desc p,
    .menu-section .box-container .box .content .stars {
        font-size: 10px !important;
    }

    .menu-section .box-container .box .content h3 {
        font-size: 14px !important;
        height: 28px;
    }
}
</style>
