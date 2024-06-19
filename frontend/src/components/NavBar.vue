<template>
    <div class="header">
        <router-link @click="scrollToTop()" to="/menu" class="logo"><img src="../assets/images/logo1.png" alt="" />TSnack
        </router-link>

        <nav class="navbar">
            <router-link @click="scrollToTop()" to="/menu">菜單</router-link>
            <router-link @click="scrollToTop()" to="/table">訂位</router-link>
        </nav>

        <div class="icons">
            <div id="menu-btn" class="fas fa-bars menu-btn" @click="showNav"></div>
            <router-link @click="scrollToTop()" to="cart">
                <div class="fas fa-shopping-cart cart"></div>
            </router-link>

            <div v-if="!user" class="fas fa-user account" @click="showLog">
                <ul class="drop-down-select">
                    <li>
                        <router-link @click="scrollToTop()" to="/login">登入</router-link>
                    </li>
                    <li>
                        <router-link @click="scrollToTop()" to="/register">註冊</router-link>
                        
                    </li>
                    <li>
                        <router-link @click="scrollToTop()" to="/staff">員工登入</router-link>
                    </li>
                </ul>

            </div>

            <div v-else class="fas fa-user account" style="background: #f38609;color: white;" @click="showLog">
                <ul class="drop-down-select">
                    <li>
                        <router-link @click="scrollToTop()" to="/myorder">我的訂單</router-link>
                    </li>
                    <li>
                        <router-link @click="handleLogout" to="/">登出</router-link>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    name: 'NavBar',

    computed: {
        ...mapState(["user"])
    },

    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll);
    },

    methods: {
        ...mapMutations(["setUser"]),

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        showNav: function () {
            let navbar = document.querySelector('.header .navbar');
            navbar.classList.toggle('active');
        },

        showLog: function () {
            let mq = window.matchMedia("(max-width: 768px)");
            if (mq.matches) {
                let log = document.querySelector('.drop-down-select');
                log.classList.toggle('active');
            }
        },

        handleScroll: function () {
            let navbar = document.querySelector('.header .navbar');
            navbar.classList.remove('active');
            let log = document.querySelector('.drop-down-select');
            log.classList.remove('active');
        },

        handleLogout: function () {
            this.setUser("");
        }
    }
}
</script>

<style scoped>
.header {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: #fff;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 9%;
}

.header .logo {
    font-size: 2.5rem;
    font-weight: bolder;
    color: #130f40;
}

.header .logo img {
    padding-right: .5rem;
    color: #27ae60;
    height: 2.5rem;
}

.header .navbar a {
    font-size: 1.7rem;
    margin: 0 1rem;
    color: #666;
}

.header .navbar a:hover {
    color: #7accc8;
}

.header .navbar a.router-link-exact-active {
    color: #275EFE;
}

.header .icons div {
    height: 4.5rem;
    width: 4.5rem;
    line-height: 4.5rem;
    font-size: 2rem;
    background: #f7f7f7;
    color: #130f40;
    border-radius: .5rem;
    margin-left: .3rem;
    cursor: pointer;
    text-align: center;
}

.header .icons div:hover {
    color: #fff;
    background: #7accc8 !important;
}

.header .icons a.router-link-exact-active .cart {
    background: #275EFE;
    color: white;
}

#menu-btn {
    display: none;
}

.header .icons .account .drop-down-select {
    display: none;
    position: absolute;
    margin-left: -50px;
    list-style-type: none;
}

.header .icons .account .drop-down-select a {
    text-decoration: none;
    color: #130f40;
    font-size: 15px;
    font-weight: 500;
    float: left;
    width: 95px;
    border-radius: 5%;
    
    
}

.header .icons .account .drop-down-select.active {
    display: block !important;
}

.header .icons .account .drop-down-select.active a {
    background-color: #f7f7f7;
}

.header .icons .account .drop-down-select.active a:hover {
    background-color: #275EFE;
    color: white;
}

/* .header .icons .account:hover .drop-down-select {
    display: block;
} */

.header .icons .account:hover .drop-down-select a {
    background-color: #f7f7f7;

}

.header .icons .account:hover .drop-down-select a:hover {
    background-color: #275EFE;
    color: white;
}

@media (min-width: 769px) {
    .header .icons .account:hover .drop-down-select {
        display: block;
    }
}

@media (max-width: 768px) {
    .header .navbar {
        position: absolute;
        top: 99%;
        left: 0;
        right: 0;
        background: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5));
        border-top: 0.1rem solid rgba(0, 0, 0, 0.2);
        border-bottom: 0.1rem solid rgba(0, 0, 0, 0.2);
        clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
        flex-direction: column;
    }

    .header .navbar.active {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }

    .header .navbar a.router-link-exact-active {
        color: #7accc8;
    }

    .header .navbar a {
        font-size: 3rem;
        margin: 2rem;
        /*display: block;*/
        color: white;
        position: relative;
        display: inline;
        cursor: pointer;
        -webkit-transition: color 0.4s ease;
        transition: color 0.4s ease;
    }


    .header .navbar a:hover:after {
        width: 100%;
    }

    .header .navbar a:after {
        content: "";
        position: absolute;
        z-index: 2;
        bottom: -0.1em;
        left: 0;
        width: 0;
        height: 2px;
        background: #7accc8;
        -webkit-transition: width 0.4s ease;
        transition: width 0.4s ease;
    }
    
    #menu-btn {
        display: inline-block;
    }

}

@media (max-width: 576px) {
    .header .navbar a {
        font-size: 2.5rem;
        margin: 0;
    }
}
</style>