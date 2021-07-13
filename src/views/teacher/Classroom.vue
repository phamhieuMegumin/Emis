<template>
  <div class="classroom-container">
    <!-- Bắt đầu header -->
    <div class="header">
      <div class="title">Danh sách lớp đang quản lý</div>
      <div class="group-button">
        <el-button class="btn--gradient" @click="dialogVisible = true"
          >Tạo lớp</el-button
        >
      </div>
    </div>
    <!-- Kết thúc header -->
    <!-- Bắt đầu danh sách lớp học -->
    <div class="class-list-container">
      <card-item v-for="(item, index) in [1, 2, 3, 4, 5]" :key="index" />
    </div>
    <!-- Kết thúc danh sách lớp học -->
  </div>
  <!-- Bắt đầu dialog -->
  <el-dialog
    title="Tạo lớp mới"
    v-model="dialogVisible"
    width="668px"
    :before-close="handleClose"
  >
    <!-- Bắt đầu Dialog main -->
    <form class="dialog-form">
      <div class="container">
        <div class="dialog-content">
          <div class="content-left">
            <div class="image-container">
              <img src="" />
            </div>
            <div class="change">Thay ảnh đại diện</div>
          </div>
        </div>
        <div class="content-right">
          <div class="row-2">
            <!-- Băt đầu input khối -->
            <div class="input-container">
              <label>Khối</label>
              <el-form-item>
                <el-select
                  v-model="classInfo.grade"
                  filterable
                  placeholder="Chọn khối"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <!-- Kết thúc select khối -->
            <!-- Bắt đầu bộ môn -->
            <div class="input-container">
              <label>Bộ môn</label>
              <el-form-item>
                <el-select
                  v-model="classInfo.subject"
                  filterable
                  placeholder="Chọn môn học"
                  multiple
                >
                  <el-option
                    v-for="item in optionsSubject"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <!-- Kết thúc bộ môn -->
          </div>
          <!-- Bắt đầu tên lớp -->
          <div class="input-container">
            <label>Tên lớp <span class="required">*</span></label>
            <el-form-item>
              <el-input
                placeholder="Khối - Môn"
                v-model="classInfo.className"
                autocomplete="off"
              />
            </el-form-item>
          </div>
          <!-- Kết thúc tên lớp -->
          <!-- Bắt đàu phần mô tả -->
          <div class="input-container">
            <label>Mô tả</label>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="Nhập mô tả (không bắt buộc)"
              v-model="classInfo.description"
              resize="none"
            >
            </el-input>
          </div>
          <!-- Kết thúc phần mô tả -->
        </div>
      </div>
    </form>
    <!-- Kết thúc dailog main -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Đóng</el-button>
        <el-button
          class="btn--gradient btn-group-left"
          @click="dialogVisible = false"
          >Lưu</el-button
        >
      </span>
    </template>
  </el-dialog>
  <!-- Kết thúc dialog -->
</template>

<script lang="ts">
import CardItem from "@/components/CardItem.vue";
import { ElMessageBox } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  components: { CardItem },
  setup() {
    /**
     * Thông tin lớp học
     */
    const classInfo = reactive({
      grade: "",
      subject: [],
      className: "",
      description: "",
    });
    /**
     * Mẫu thử option
     */
    const options = ref([
      {
        value: "6",
        label: "Khối 6",
      },
      {
        value: "7",
        label: "Khối 7",
      },
      {
        value: "8",
        label: "Khối 8",
      },
    ]);
    const optionsSubject = ref([
      {
        value: "0",
        label: "Toán",
      },
      {
        value: "1",
        label: "Lý",
      },
      {
        value: "2",
        label: "Hóa",
      },
    ]);
    const dialogVisible = ref(false);

    const handleClose = (done: any) => {
      ElMessageBox.confirm("Bạn có muốn lưu trước khi rời đi không?", {
        title: "EMIS Ôn tập",
        showClose: false,
        dangerouslyUseHTMLString: true,

        showCancelButton: true,
        showConfirmButton: true,
      })
        .then(() => {
          done();
        })
        .catch();
    };
    return {
      dialogVisible,
      handleClose,
      classInfo,
      options,
      optionsSubject,
    };
  },
});
</script>

<style scoped>
/* Css header */
.classroom-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0 24px;
  padding-bottom: 24px;
}
.classroom-container .header {
  padding-top: 24px;
  width: 100%;
}
.classroom-container .header .title {
  float: left;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #4e5b6a;
  margin-bottom: 10px;
}
.classroom-container .header .group-button {
  float: right;
  margin-right: 6px;
}
/* Kết thúc css header */
/* Css khung chứa card */
.class-list-container {
  display: flex;
  flex-wrap: wrap;
  margin-left: -12px;
  margin-right: -12px;
  height: calc(100vh - 140px);
  overflow-y: auto;
}
/* Kết thúc css khung chứa card */
/* Dialog css */
.container {
  display: flex;
  justify-content: space-between;
}
.content-left {
  width: 221px;
  margin-right: 24px;
}
.image-container {
  border-radius: 10px;
  border: 1px solid rgb(182, 185, 206);
  width: 211px;
  height: 112px;
  overflow: hidden;
}
.container {
  margin-top: 0;
}
.change {
  font-weight: 500;
  color: rgb(138, 107, 246);
  margin-top: 12px;
  text-align: center;
}
.row-2 {
  display: flex;
}
.row-2 .input-container:nth-child(1) {
  margin-right: 12px;
  width: 33.33333%;
}
.row-2 .input-container:nth-child(2) {
  flex: 1;
}
.input-container {
  margin-bottom: 10px;
}
.input-container label {
  display: inline-block;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 2px;
  color: #4e5b6a;
}
.btn-group-left {
  margin-left: 12px !important;
}
.required {
  color: red;
}
/* Kết thúc css dialog */
</style>
