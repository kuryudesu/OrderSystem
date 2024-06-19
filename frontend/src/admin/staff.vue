<template>
    <div class="login-container">
        <div class="login-form-container">
            <form id="staffForm" @submit="handleSubmit" novalidate autocomplete="off">
                <div class="header">
                    <h3>STAFF</h3>
                    <h3 class="admin">
                        <router-link @click="scrollToTop()" to="/admin">管理</router-link>
                    </h3>
                </div>
                <div v-if="errors.length" class="error-box">
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </div>

                <div class="form-group">
                    <input type="sn" id="sSn" name="sSn" class="form-control" placeholder="員工編號"
                        v-model="loginObj.sn" />
                </div>

                <div class="form-group">
                   <!--  <input type="password" id="sPass" name="sPass" class="form-control"
                        placeholder="密碼" v-model="loginObj.pass" />
 -->
                    <div class="input-pass">
                        <input :type="pwdShow ? 'text' : 'password'" name="sPass" placeholder="密碼" id="sPass"
                            class="form-control" v-model="loginObj.pass" />
                            <i :class="pwdShow ? 'fas fa-eye-slash fa-2xl' : 'fas fa-eye fa-2xl'" v-if="showPwdIcon && loginObj.pass.length >0" @click="toggleShowPwd"></i>
                    </div>
                </div>
                <div class="form-group">
                    <input type="submit" value="登入" class="btn">
                </div>
            </form>
        </div>
    </div>
</template>


<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
    name: 'Staff',

    data() {
        return {
            loginObj: { sn: "", pass: "" },
            matchUser: undefined,
            errors: [],
            pwdShow: false,
        }
    },

    methods: {
        ...mapMutations(["setStaff"]),
        ...mapMutations(["setAdmin"]),

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        toggleShowPwd() {
                this.pwdShow = !this.pwdShow;
        },

        showPwdIcon() {
            this.showPwdIcon = true;
        },

        async getMatchStaff(sn) {
            let data = await axios.get('/employees/' + sn);
            this.matchStaff = data.data;
        },

        async handleSubmit(e) {
            this.errors = [];

            if (!this.loginObj.sn) {
                this.errors.push("請輸入員工編號");
            }
            else {
                if (!this.loginObj.sn.startsWith('1')) {
                    this.errors.push('員工編號必須為1開頭');
                }
                if (this.loginObj.sn.length != 10) {
                    this.errors.push('員工編號必須10位號碼');
                }

                if (!/[0-9]{10}/.test(this.loginObj.sn)) {
                    this.errors.push('員工編號只能有數字');
                }
            }

            if (!this.loginObj.pass) {
                this.errors.push('請輸入密碼');
            }

            if (!this.errors.length == 0) {
                e.preventDefault();
            }
            else {
                e.preventDefault();
                await this.getMatchStaff(this.loginObj.sn);
                if (!this.matchStaff) {
                    this.errors.push("員工編號或密碼有誤!")
                }
                else {
                    if (this.matchStaff.staff_password === this.loginObj.pass) {
                        this.matchStaff.staff_password = "";
                        this.setAdmin("admin");
                        this.setStaff(this.matchStaff);
                        this.$router.push("/admin/dashboard");
                    }
                    else {
                        this.errors.push("員工編號或密碼有誤!")
                    }
                }
            }
        }
    }
}
</script>

<style scoped>
.login-container {
    padding: 2rem 9%;
}

.login-container .login-form-container {
    background-color: #fff;
    height: 90vh;
}

.login-container .login-form-container .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.login-container .login-form-container form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 40rem;
    width: 100%;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
    border: 0.1rem solid rgba(0, 0, 0, 0.2);
    padding: 2rem;
    border-radius: .5rem;
    animation: fadeUp .4s linear;
}

.login-container .login-form-container form h3 {
    padding-bottom: 1rem;
    font-size: 2rem;
    font-weight: bolder;
    text-transform: uppercase;
    color: #130f40;
    margin: 0;
}

.login-container .login-form-container form .form-control {
    margin: .7rem 0;
    border-radius: .5rem;
    background: #f7f7f7;
    padding: 2rem 1.2rem;
    font-size: 1.6rem;
    color: #130f40;
    text-transform: none;
    width: 100%;
    border: none;
}

.login-container .login-form-container form .btn {
    margin-bottom: 1rem;
    margin-top: 1rem;
    width: 100%;
}

.login-container .login-form-container form p {
    padding-top: 1rem;
    font-size: 1.5rem;
    color: #666;
    margin: 0;
}

.login-container .login-form-container form p a {
    color: #27ae60;
}

.login-container .login-form-container form p a:hover {
    color: #130f40;
    text-decoration: underline;
}

.login-container .login-form-container form .admin {
    font-size: 1.8rem;
    color: #666;
    margin: 0;
}

.login-container .login-form-container form .admin a {
    color: #7accc8;
}

.login-container .login-form-container form .admin a:hover {
    color: #275EFE;
    text-decoration: underline;
}


.login-container .login-form-container form .error-box {
    background-color: #fff9fa;
    box-sizing: border-box;
    border: 2px solid rgba(255, 66, 79, .2);
    border-radius: 2px;
    font-size: 12px;
    margin-bottom: 20px;
}

.login-container .login-form-container form .error-box ul {
    list-style-type: none;
    margin: 0;
    padding: 10px 0px;
}

.login-container .login-form-container form .error-box ul li {
    padding-left: 10px;
    color: rgb(182, 0, 0);
}

.input-pass {
    position: relative;
    width: 100%;
}

.input-pass input {
    width: calc(100% - 40px);
    padding-right: 40px; 
}

.input-pass i {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
}
</style>