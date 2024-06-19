<template>
    <div class="register-container">
        <div class="register-form-container">
            <form id="registerForm" @submit="handleSubmit" novalidate autocomplete="off">
                <h3>創建帳戶</h3>
                <div class="form-group">
                    <label for="uName">姓名:
                    </label>
                    <input type="text" name="uName" placeholder="輸入姓名" id="uName" class="form-control"
                        v-model="registerObj.name" />
                    <p class="error-mess" v-if="errorObj.nameErr.length > 0">{{ errorObj.nameErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="uEmail">電子郵件地址:
                    </label>
                    <input type="email" name="uEmail" placeholder="輸入電子郵件地址" id="uEmail" class="form-control"
                        v-model="registerObj.email" />
                    <p class="error-mess" v-if="errorObj.emailErr.length > 0">{{ errorObj.emailErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="uPass">密碼:
                    </label>
                    <div class="input-pass input">
                        <input :type="pwdShow ? 'text' : 'password'" name="uPass" placeholder="輸入密碼" id="uPass"
                            class="form-control" v-model="registerObj.pass" />
                            <i :class="pwdShow ? 'fas fa-eye-slash fa-2xl' : 'fas fa-eye fa-2xl'" v-if="showPwdIcon && registerObj.pass.length >0" @click="toggleShowPwd"></i>
                    </div>
                    <p class="error-mess" v-if="errorObj.passErr.length > 0">{{ errorObj.passErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="uPassConfirm">確認密碼:
                    </label>
                    <div class="input-pass">
                        <input :type="PwdShowConfirm ? 'text' : 'password'" name="uPassConfirm" placeholder="確認密碼" id="uPassConfirm"
                            class="form-control" v-model="registerObj.confirm" />
                            <i :class="PwdShowConfirm ? 'fas fa-eye-slash fa-2xl' : 'fas fa-eye fa-2xl'" v-if="showPwdIcon && registerObj.confirm.length >0" @click="toggleShowConfirmPwd"></i>
                    </div>
                    <p class="error-mess" v-if="errorObj.confirmErr.length > 0">{{ errorObj.confirmErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="uPhone">電話:
                    </label>
                    <input type="tel" name="uPhone" placeholder="輸入電話號碼" id="uPhone"
                        class="form-control" v-model="registerObj.phone" />
                    <p class="error-mess" v-if="errorObj.phoneErr.length > 0">{{ errorObj.phoneErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="uBirth">出生年月日:
                    </label>
                    <input type="date" name="uBirth" id="uBirth" class="form-control" @click="availableTime()"
                         v-model="registerObj.birth" />
                    <p class="error-mess" v-if="errorObj.birthErr.length > 0">{{ errorObj.birthErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="">性別:
                    </label>
                    <div class="form-group">
                        <input type="radio" name="gender" value="male" id="genderMale"
                            v-model="registerObj.gender" /><span>男性</span>
                        <input type="radio" name="gender" value="female" id="genderFemale"
                            v-model="registerObj.gender" /><span>女性</span>
                        <input type="radio" name="gender" value="other" id="genderOther"
                            v-model="registerObj.gender" /><span>其他</span>
                    </div>
                    <p class="error-mess" v-if="errorObj.genderErr.length > 0">{{ errorObj.genderErr[0] }}</p>
                </div>

                <div class="form-group">
                    <input type="submit" value="註冊" class="btn" />
                    <p>已經擁有帳戶? <router-link @click="scrollToTop()" to="/login">登入</router-link>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "Register",

    data() {
        return {
            registerObj: { name: "", email: "", pass: "", confirm: "", phone: "", birth: "", gender: "" },
            errorObj: { nameErr: [], emailErr: [], passErr: [], confirmErr: [], phoneErr: [], birthErr: [], genderErr: [] },
            matchUser: undefined,
            pwdShow: false,
            PwdShowConfirm: false,
        }
    },

    methods: {
        async getMatchUser(email) {
            let data = await axios.get('/users/' + email);
            this.matchUser = data.data;
        },

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        toggleShowPwd() {
                this.pwdShow = !this.pwdShow;
        },

        toggleShowConfirmPwd () {
                this.PwdShowConfirm = !this.PwdShowConfirm;
        },

        showPwdIcon() {
            this.showPwdIcon = true;
        },

        availableTime: function () {
            var now = new Date();
            var day = ("0" + now.getDate()).slice(-2);
            var currentMonth = ("0" + (now.getMonth() + 1)).slice(-2);
            var minRange = (now.getFullYear() - 150) + "-" + currentMonth + "-" + day;
            var maxRange = now.getFullYear() + "-" + currentMonth + "-" + day;

            document.getElementById("uBirth").setAttribute("min", minRange);
            document.getElementById("uBirth").setAttribute("max", maxRange);
        },

        resetCheckErr: function () {
            this.errorObj.nameErr = [];
            this.errorObj.emailErr = [];
            this.errorObj.passErr = [];
            this.errorObj.confirmErr = [];
            this.errorObj.phoneErr = [];
            this.errorObj.birthErr = [];
            this.errorObj.genderErr = [];
        },

        checkEmptyErr: function () {
            for (var typeErr in this.errorObj) {
                if (this.errorObj[typeErr].length != 0) {
                    return false;
                }
            }
            return true;
        },

        checkForm: function () {
            this.resetCheckErr();

            // Name validate
            if (!this.registerObj.name) {
                this.errorObj.nameErr.push("請輸入姓名");
            }
            else {
                if (!/^[A-Za-z\u4E00-\u9FFF]+$/.test(this.registerObj.name.replace(/\s/g, ""))) {
                    this.errorObj.nameErr.push('此姓名不被接受');
                }
            }

            // Email validate
            if (!this.registerObj.email) {
                this.errorObj.emailErr.push("請輸入電子郵件地址");
            }
            else {
                if (!/^[a-zA-Z0-9.!#%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/.test(this.registerObj.email)) {
                    this.errorObj.emailErr.push('請輸入有效的電子郵件地址');
                }
            }

            // Pass validate
            if (!this.registerObj.pass) {
                this.errorObj.passErr.push('請輸入密碼');
            }
            else {
                if (!/[!@#$%^&*]/.test(this.registerObj.pass)) {
                    this.errorObj.passErr.push('密碼必須包含至少一個特殊字元');
                }

                if (this.registerObj.pass.length < 8) {
                    this.errorObj.passErr.push('密碼必須大於8個字元');
                }
            }

            // Confirm Pass validate
            if (!this.registerObj.confirm) {
                this.errorObj.confirmErr.push('請輸入確認密碼');
            }
            else {
                if (this.registerObj.pass !== this.registerObj.confirm) {
                    this.errorObj.confirmErr.push('確認密碼必須與密碼相匹配');
                }
            }


            // Phone validate
            if (!this.registerObj.phone) {
                this.errorObj.phoneErr.push('請輸入電話號碼');
            }
            else {
                if (!this.registerObj.phone.startsWith('09')) {
                    this.errorObj.phoneErr.push('電話號碼必須09為開頭');
                } else if (this.registerObj.phone === '0900000000') {
                    this.errorObj.phoneErr.push('此組號碼為非法號碼');
                }

                if (this.registerObj.phone.length != 10) {
                    this.errorObj.phoneErr.push('電話號碼必須10位號碼');
                }

                if (!/[0-9]{10}/.test(this.registerObj.phone)) {
                    this.errorObj.phoneErr.push('電話號碼只能有數字');
                }
            }

            // Birth validate
            if (!this.registerObj.birth) {
                this.errorObj.birthErr.push("請輸入生日");
            }
            else {
                let minRange = document.getElementById("uBirth").getAttribute("min");
                let maxRange = document.getElementById("uBirth").getAttribute("max");
                let dateMin = new Date(minRange);
                let dateMax = new Date(maxRange);
                let dateInput = new Date(this.registerObj.birth);

                if (dateInput === "Invalid Date") {
                    this.errorObj.birthErr.push("無效日期");
                }

                if (dateInput.getTime() < dateMin.getTime() || dateInput.getTime() > dateMax.getTime()) {
                    this.errorObj.birthErr.push("超出有效年月日範圍(150年至今)");
                }
            }

            // Gender validate
            if (!this.registerObj.gender) {
                this.errorObj.genderErr.push("請選擇性別");
            }
        },

        async handleSubmit(e) {
            this.checkForm();

            if (!this.checkEmptyErr()) {
                e.preventDefault();
            } else {
                e.preventDefault();
                await this.getMatchUser(this.registerObj.email);
                if (this.matchUser) {
                    this.errorObj.emailErr.push("帳號已被註冊")
                }
                else {
                    let data = {
                        user_name: this.registerObj.name,
                        user_email: this.registerObj.email,
                        user_phone: this.registerObj.phone,
                        user_password: this.registerObj.pass,
                        user_birth: this.registerObj.birth,
                        user_gender: this.registerObj.gender
                    }
                    await axios.post("/users/", data);
                    this.$router.push("/login");
                }
            }
        }
    },

};
</script>


<style scoped>
.register-container {
    padding: 2rem 9%;
}

.register-container .register-form-container {
    background: #fff;

}

.register-container .register-form-container form {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0%);
    max-width: 70rem;
    width: 100%;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
    border: 0.1rem solid rgba(0, 0, 0, 0.2);
    padding: 2rem;
    border-radius: 0.5rem;
    animation: fadeUp 0.4s linear;
}

.register-container .register-form-container form h3 {
    padding-bottom: 1rem;
    font-size: 2rem;
    text-transform: uppercase;
    color: #130f40;
    margin: 0;
}

.register-container .register-form-container form .form-control {
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

.register-container .register-form-container form label {
    font-size: 2rem;
    margin: 0;
    padding: 0;
}

.register-container .register-form-container form span {
    font-size: 18px;
    padding-left: 5px;
    padding-right: 40px;
}

.register-container .register-form-container form .btn {
    margin: 1rem 0;
    width: 100%;
    text-align: center;
}

.register-container .register-form-container form p {
    padding-top: 1rem;
    font-size: 1.5rem;
    color: #666;
    margin: 0;
}

.register-container .register-form-container form p a {
    color: #27ae60;
}

.register-container .register-form-container form p a:hover {
    color: #130f40;
    text-decoration: underline;
}

.register-container .register-form-container form .form-group {
    margin: 0;
}

.register-container .register-form-container form .form-group .error-mess {
    font-size: 1.5rem;
    position: relative;
    color: rgb(243, 47, 47);
    margin: 0;
    padding: 0;
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
