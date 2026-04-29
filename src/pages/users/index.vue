<template>
  <div class="user-index">
    <div class="page-header">
      <PageHeader title="ユーザー一覧" />
      <BaseButton label="新規ユーザー登録" icon="plus" />
    </div>

    <!-- フィルターセクション -->
    <div class="filter-section">
      <div class="filter-item filter-name">
        <label class="filter-label">名前で検索</label>
        <BaseInput v-model="searchName" placeholder="名前を入力してください" />
      </div>
      <div class="filter-item">
        <label class="filter-label">在籍状況</label>
        <div class="checkbox-group">
          <BaseCheckbox v-model="employmentStatus.active" label="在籍" />
          <BaseCheckbox v-model="employmentStatus.retired" label="退職" />
        </div>
      </div>
      <div class="filter-item">
        <label class="filter-label">所属部署</label>
        <BaseSelect
          v-model="selectedDepartment"
          :placeholder="'部署を選択してください'"
          :options="departments"
        />
      </div>
      <div class="filter-item">
        <div class="filter-label"></div>
        <div class="button-group">
          <BaseButton label="クリア" type="secondary" @click="clearFilters" />
        </div>
      </div>
    </div>

    <!-- テーブルセクション -->
    <div class="table-section">
      <div class="table-header">
        <!-- 件数表示 -->
        <div class="table-header-left">
          <span class="table-header-left__count">
            全 {{ totalCount }} 件中 {{ startIndex }} - {{ endIndex }} 件を表示
          </span>

          <BaseSelect v-model="pageSize" :options="pageSizeOptions" />
        </div>

        <!-- ページネーション -->
        <div class="table-header-right">
          <BasePagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @change="handlePageChange"
          />
          <span class="table-header-right__page-info" v-if="totalPages > 1">
            ／ {{ totalPages }} ページ
          </span>
        </div>
      </div>

      <!-- テーブル -->
      <BaseTable :fields="fields" :items="paginatedUsers">
        <!-- 名前 -->
        <template #cell(name)="row">
          <router-link class="user-link" :to="`/users/${row.item.userId}`">
            {{ row.item.lastName }} {{ row.item.firstName }}
          </router-link>
        </template>

        <!-- 所属部署 -->
        <template #cell(department)="row">
          {{ departmentsLabel(row.item.department) }}
        </template>

        <!-- 入社日 -->
        <template #cell(joinDate)="row">
          {{ formatDate(row.item.joinDate) }}
        </template>

        <!-- 在籍状況 -->
        <template #cell(isActive)="row">
          <span
            class="status-badge"
            :class="row.item.isActive ? 'status-active' : 'status-retired'"
          >
            {{ row.item.isActive ? "在籍" : "退職" }}
          </span>
        </template>

        <!-- 退職日 -->
        <template #cell(retireDate)="row">
          {{ row.item.retireDate ? formatDate(row.item.retireDate) : "-" }}
        </template>
      </BaseTable>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/common/BaseButton.vue";
import BaseCheckbox from "@/components/common/BaseCheckbox.vue";
import BaseInput from "@/components/common/BaseInput.vue";
import BaseSelect from "@/components/common/BaseSelect.vue";
import BaseTable from "@/components/common/BaseTable.vue";
import PageHeader from "@/components/common/PageHeader.vue";
import BasePagination from "@/components/common/BasePagination.vue";
import { usersMock } from "@/mock/users";
import moment from "moment";

export default {
  name: "UserIndexPage",
  components: {
    BaseButton,
    BaseCheckbox,
    BaseInput,
    BaseSelect,
    BaseTable,
    PageHeader,
    BasePagination,
  },
  data() {
    return {
      // ユーザー一覧モックデータ
      usersMock,

      // 名前で検索の入力値
      searchName: "",

      // ページネーション現在のページ
      currentPage: 1,
      // ページネーション1ページあたりの件数
      pageSize: 20,
      // ページネーションのページサイズ選択肢
      pageSizeOptions: [
        { value: 10, label: "10件" },
        { value: 20, label: "20件" },
        { value: 50, label: "50件" },
        { value: 100, label: "100件" },
      ],

      // テーブル定義
      fields: [
        { key: "userId", label: "ユーザーID" },
        { key: "name", label: "名前" },
        { key: "email", label: "メールアドレス" },
        { key: "department", label: "部署" },
        { key: "joinDate", label: "入社日" },
        { key: "isActive", label: "在籍状況" },
        { key: "retireDate", label: "退職日" },
      ],

      // 在籍状況のチェックボックスの初期状態
      employmentStatus: {
        active: true,
        retired: false,
      },

      // 所属部署のセレクトボックスの選択値
      selectedDepartment: "",

      // 所属部署のセレクトボックスの選択肢
      departments: [
        { value: "", label: "すべての部署" },
        { value: "1", label: "人事部" },
        { value: "2", label: "営業部" },
        { value: "3", label: "総務部" },
        { value: "4", label: "開発部" },
      ],
    };
  },
  computed: {
    // フィルタリング後のユーザー件数
    totalCount() {
      return this.filteredUsers.length;
    },

    // ページネーションの総ページ数
    totalPages() {
      return Math.ceil(this.totalCount / this.pageSize);
    },

    // 表示中の開始インデックス
    startIndex() {
      return (this.currentPage - 1) * this.pageSize + 1;
    },

    // 表示中の終了インデックス
    endIndex() {
      return Math.min(this.currentPage * this.pageSize, this.totalCount);
    },

    //
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;

      return this.filteredUsers.slice(start, end);
    },

    // フィルタリングされたユーザー一覧
    filteredUsers() {
      let result = this.usersMock;

      // ===== 名前検索 =====
      if (this.searchName) {
        const keyword = this.searchName.toLowerCase();

        result = result.filter((user) => {
          const fullName = `${user.lastName}${user.firstName}`.toLowerCase();
          const kana =
            `${user.lastNameKana}${user.firstNameKana}`.toLowerCase();

          return fullName.includes(keyword) || kana.includes(keyword);
        });
      }

      // ===== 在籍フィルタ =====
      const { active, retired } = this.employmentStatus;

      if (!active && !retired) {
        return [];
      }

      if (!(active && retired)) {
        result = result.filter((user) => {
          if (active) return user.isActive;
          if (retired) return !user.isActive;
        });
      }

      // ===== 部署フィルタ =====
      if (this.selectedDepartment) {
        result = result.filter((user) => {
          return String(user.department) === this.selectedDepartment;
        });
      }

      return result;
    },
  },
  watch: {
    pageSize() {
      this.currentPage = 1;
    },
    // 名前で検索に入力されたらページを1に戻す
    searchName() {
      this.currentPage = 1;
    },
    // 在籍状況のチェックボックスを変更したらページを1に戻す
    employmentStatus: {
      handler() {
        this.currentPage = 1;
      },
      deep: true,
    },
    // 所属部署のセレクトボックスを変更したらページを1に戻す
    selectedDepartment() {
      this.currentPage = 1;
    },
  },
  methods: {
    /**
     * ページ変更ハンドラー
     * @param page
     */
    handlePageChange(page) {
      this.currentPage = page;
    },

    /**
     * 所属部署のvalueからlabelを取得する
     * @param value
     */
    departmentsLabel(value) {
      const department = this.departments.find((dept) => dept.value === value);
      return department ? department.label : "";
    },

    /**
     * 日付をYYYY/MM/DD形式に変換する
     * @param dateStr YYYYMMDD形式の日付文字列
     * @returns YYYY/MM/DD形式の日付文字列
     */
    formatDate(dateStr) {
      if (!dateStr) return "";
      const date = moment(dateStr, "YYYYMMDD");
      return date.isValid() ? date.format("YYYY/MM/DD") : "";
    },

    /**
     * フィルターをクリアする
     */
    clearFilters() {
      this.searchName = "";
      this.employmentStatus.active = true;
      this.employmentStatus.retired = false;
      this.selectedDepartment = "";
    },
  },
};
</script>

<style scoped>
/* ページ全体のスタイル */
.user-index {
  padding: 24px;
}

/*  */
.page-header {
  display: flex;
  justify-content: space-between;
}

/* フィルターセクション */
.filter-section {
  display: flex;
  margin-top: 16px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}
.filter-item {
  width: max-content;
  margin-right: 32px;
}
.filter-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  height: 24px;
}
.filter-name {
  width: 240px;
}
.checkbox-group {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 40px;
}
.button-group {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 40px;
}

/* テーブルセクション */
.table-section {
  margin-top: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

/* テーブルヘッダーセクション */
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
}
.table-header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.table-header-left__count {
  font-size: 14px;
  color: #374151;
}
.table-header-right {
  display: flex;
  align-items: center;
}
.table-header-right__page-info {
  font-size: 14px;
  color: #374151;
}

/* ユーザーテーブル */
.user-table {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}
/* ユーザーテーブルヘッダー */
.user-table thead th {
  background-color: #e5e7eb !important;
  color: #111827;
  font-weight: 700;
  font-size: 14px;
  padding: 12px;
  border-bottom: 1px solid #d1d5db;
}
/* ユーザーテーブルボディ */
.user-table tbody td {
  font-size: 14px;
  padding: 12px;
  color: #111827;
  vertical-align: middle;
}
/* ユーザーテーブル行hover */
.user-table tbody tr:hover {
  background: #f9fafb;
}
/* ユーザーテーブル名前リンク */
.user-link {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}
.user-link:hover {
  text-decoration: underline;
}
/* 在籍状況バッジ */
.status-badge {
  display: inline-block;
  padding: 4px 15px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}
/* 在籍 */
.status-active {
  background: #dcfce7;
  color: #166534;
  border: 1px solid rgb(125, 208, 157);
}
/* 退職 */
.status-retired {
  background: #dfdfdf;
  color: #616262;
  border: 1px solid rgb(97, 98, 98);
}
</style>
