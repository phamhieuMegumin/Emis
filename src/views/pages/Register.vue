<template>
  <div class="register-container">
    <div class="form-group">
      <div class="logo">
        <img
          class="back-img"
          src="https://testqlthapp.misacdn.net/r/ontap/img/ic_back.d6de4fc8.svg"
          width="44"
          height="36"
          @click="handleBackLogin"
        />
        <div class="logo-title">Đăng ký tài khoản</div>
      </div>
      <div class="container form-content">
        <!-- Bắt đầu form input -->
        <div class="tab-container">
          <el-form :model="userAccount" :rules="rules">
            <!-- Bắt đầu Input userName -->
            <div class="row-input row-2">
              <el-form-item prop="fullName">
                <el-input
                  placeholder="Họ và tên"
                  v-model="userAccount.fullName"
                  autocomplete="off"
                >
                  <template #prefix>
                    <div class="input-prefix-icon">
                      <img
                        src="https://testqlthapp.misacdn.net/r/ontap/img/icon_user.eb8ff65a.svg"
                        width="16"
                        height="16"
                      />
                    </div>
                  </template>
                </el-input>
              </el-form-item>
            </div>
            <!-- Kết thúc input UserName -->
            <!-- Bắt đầu input PhoneNumber -->
            <div class="row-input">
              <el-form-item prop="phoneNumber">
                <el-input
                  placeholder="Nhập số điện thoại"
                  v-model="userAccount.phoneNumber"
                  autocomplete="off"
                >
                  <template #prefix>
                    <div class="input-prefix-icon">
                      <img
                        src="https://testqlthapp.misacdn.net/r/ontap/img/icon_phone.a18b4824.svg"
                        width="16"
                        height="16"
                      />
                    </div>
                  </template>
                </el-input>
              </el-form-item>
            </div>
            <!-- kết thúc input PhoneNumber -->
            <!-- Bắt đầu input Email -->
            <div class="row-input">
              <el-form-item prop="email">
                <el-input
                  placeholder="Nhập email (Không bắt buộc)"
                  v-model="userAccount.email"
                >
                  <template #prefix>
                    <div class="input-prefix-icon">
                      <img
                        src="https://testqlthapp.misacdn.net/r/ontap/img/icon_email.0ef2751c.svg"
                        width="20"
                        height="16"
                      />
                    </div>
                  </template>
                </el-input>
              </el-form-item>
            </div>
            <!-- kết thúc input Email -->
            <!-- Bắt đầu inputPassword -->
            <div class="row-input">
              <el-form-item prop="password">
                <el-input
                  placeholder="Nhập mật khẩu"
                  v-model="userAccount.password"
                  type="password"
                  autocomplete="off"
                >
                  <template #prefix>
                    <div class="input-prefix-icon">
                      <img
                        src="https://testqlthapp.misacdn.net/r/ontap/img/icon_key.1533a911.svg"
                        width="16"
                        height="16"
                      />
                    </div>
                  </template>
                </el-input>
              </el-form-item>
            </div>
            <!-- kết thúc inputPassword -->
          </el-form>

          <div class="row">
            <el-button class="btn--gradient btn-100" @click="handleSubmit"
              >Đăng ký</el-button
            >
          </div>
        </div>
        <!-- Kết thúc form input -->
        <!-- Bắt đầu form footer -->
        <div class="form-footer">
          <div class="container">
            <div class="row">
              <router-link to="/"
                ><span class="text-accent"
                  >Đăng ký tài khoản học sinh</span
                ></router-link
              >
            </div>
          </div>
        </div>
        <!-- Kết thúc form footer -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import Notification from "../../uses/Notification";
import axios from "axios";
import { useRouter } from "vue-router";
import User from "../../types/User";
import AuthManager from "../../uses/Auth";
// import { useStore } from "vuex";
export default defineComponent({
  setup() {
    /**
     * Quy chuẩn kiểm tra form để validate
     * CreatedBy : PQhieu(12/07/2021)
     */
    const rules = reactive({
      fullName: [
        {
          required: true,
          message: "Không được để trống",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "Không được để trống",
          trigger: "blur",
        },
      ],
      phoneNumber: [
        {
          required: true,
          message: "Không được để trống",
          trigger: "blur",
        },
      ],
      email: [
        {
          required: false,
        },
      ],
    });
    /**
     * Thông tin account
     * CreatedBy: PQHieu(12/07/2021)
     */
    const userAccount = reactive<User>({
      fullName: "",
      password: "",
      email: "",
      phoneNumber: "",
    });
    const { handleRegister } = AuthManager();
    // const store = useStore();
    const { successNotify, ErrorNotify } = Notification();
    const router = useRouter();
    console.log(router);

    const handleBackLogin = () => {
      router.push("/login");
    };
    /**
     * Thực hiện đăng ký tài khoản người dùng
     * CreatedBy: PQhieu(18/07/2021)
     */
    const handleSubmit = () => {
      handleRegister(userAccount);
    };
    const register = async () => {
      try {
        await axios({
          method: "post",
          url: "https://localhost:44308/api/v1/Users/Register",
          data: userAccount,
        });
        await successNotify();
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } catch (error) {
        ErrorNotify();
      }
    };
    return {
      userAccount,
      handleSubmit,
      register,
      handleBackLogin,
      rules,
    };
  },
});
</script>

<style scoped>
/* Logo */
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-title {
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: #4e5b6a;
}
.back-img {
  position: absolute;
  width: auto;
  padding: 8px;
  top: 24px;
  left: 16px;
  cursor: pointer;
}
/* Kết thúc logo */

/* Bắt đầu form content */
.form-content {
  margin-top: 16px;
}
/* Kết thúc form content */
</style>
