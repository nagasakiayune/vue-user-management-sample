<template>
  <div class="catalog-page">
    <!-- // PageHeader -->
    <PageHeader
      title="コンポーネントカタログ"
      description="プロジェクトで使用している共通コンポーネントの一覧です。"
    />
    <!-- // BaseButton -->
    <div class="catalog-selection">
      <div class="catalog-items">
        <h2 class="text-2xl font-bold">1. BaseButton</h2>
        <div class="mt-2 button-group">
          <label class="button-label">デフォルト</label>
          <BaseButton label="キャンセル" type="secondary" />
          <BaseButton label="保存" @click="save" />
        </div>
        <div class="mt-2 button-group">
          <label class="button-label">アイコン付き</label>
          <BaseButton label="追加" icon="plus" type="secondary" />
          <BaseButton label="検索" icon="search" />
        </div>
      </div>
    </div>

    <!-- // BaseCheckbox -->
    <div class="catalog-selection">
      <div class="catalog-items">
        <h2 class="text-2xl font-bold">2. BaseCheckbox</h2>
        <div class="mt-2">
          <BaseCheckbox label="在籍" v-model="isActive" />
          <BaseCheckbox label="退職" v-model="isRetired" />
        </div>
      </div>
    </div>

    <!-- // BaseInput -->
    <div class="catalog-selection">
      <div class="catalog-items">
        <h2 class="text-2xl font-bold">3. BaseInput</h2>
        <div class="input-group mt-2">
          <BaseInput
            label="ユーザー名"
            placeholder="ユーザー名を入力してください"
          />
        </div>
        <div class="input-group">
          <BaseInput
            label="アイコン付き"
            placeholder="ユーザー名を入力してください"
            icon="search"
          />
        </div>
      </div>
    </div>

    <!-- // BasePagination -->
    <div class="catalog-selection">
      <div class="catalog-items">
        <h2 class="text-2xl font-bold">4. BasePagination</h2>

        <BasePagination
          :current-page="page"
          :total-pages="5"
          @change="page = $event"
        />
      </div>
    </div>

    <!-- // BaseSelect -->
    <div class="catalog-selection">
      <div class="catalog-items">
        <h2 class="text-2xl font-bold">5. BaseSelect</h2>
        <div class="mt-2">
          <BaseSelect
            label="役割"
            :options="[
              { value: 'admin', label: '管理者' },
              { value: 'editor', label: '編集者' },
              { value: 'viewer', label: '閲覧者' },
            ]"
          />
        </div>
      </div>
    </div>

    <!-- // BaseTable -->
    <div class="catalog-selection">
      <div class="catalog-items">
        <h2 class="text-2xl font-bold">6. BaseTable</h2>
        <BaseTable :fields="fields" :items="usersMock" />
      </div>
    </div>

    <!-- // ConfirmDialog -->
    <div class="catalog-selection">
      <div class="catalog-items">
        <h2 class="text-2xl font-bold">7. ConfirmDialog</h2>
        <div class="mt-2">
          <BaseButton label="確認ダイアログ表示" @click="showDialog = true" />
          <ConfirmDialog
            :visible="showDialog"
            title="確認"
            message="保存せずに戻りますか？"
            confirm-text="戻る"
            cancel-text="キャンセル"
            @confirm="handleConfirm"
            @cancel="showDialog = false"
          />
        </div>
      </div>
    </div>

    <!-- // PageHeader -->
    <div class="catalog-selection">
      <div class="catalog-items">
        <h2 class="text-2xl font-bold">8. PageHeader</h2>
        <div class="mt-2">
          <PageHeader
            title="ページタイトル"
            description="このページの説明を記載します。"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "../components/common/BaseButton.vue";
import BaseCheckbox from "../components/common/BaseCheckbox.vue";
import BasePagination from "../components/common/BasePagination.vue";
import BaseSelect from "../components/common/BaseSelect.vue";
import BaseInput from "../components/common/BaseInput.vue";
import ConfirmDialog from "@/components/common/ConfirmDialog.vue";
import PageHeader from "@/components/common/PageHeader.vue";
import BaseTable from "@/components/common/BaseTable.vue";

export default {
  data() {
    return {
      // BaseCheckboxの状態管理用データ
      isActive: true, // 在籍状態
      isRetired: false, // 退職状態

      // ConfirmDialogの表示状態
      showDialog: false, // 確認ダイアログを表示するか

      // BasePaginationの現在のページ
      page: 1,

      // BaseTableのテーブル定義
      fields: [
        { key: "id", label: "ID" },
        { key: "name", label: "名前" },
        { key: "email", label: "メールアドレス" },
      ],
      // BaseTableのテーブルデータ
      usersMock: [
        { id: 1, name: "山田太郎", email: "taro.yamada@example.com" },
        { id: 2, name: "鈴木花子", email: "hanako.suzuki@example.com" },
        { id: 3, name: "佐藤次郎", email: "jiro.sato@example.com" },
      ],
    };
  },
  components: {
    BaseButton,
    BaseCheckbox,
    BaseInput,
    BaseSelect,
    ConfirmDialog,
    PageHeader,
    BasePagination,
    BaseTable,
  },
  methods: {
    save() {
      alert("保存");
    },
    handleConfirm() {
      this.showDialog = false;
      alert("戻る");
    },
  },
};
</script>

<style scoped>
.catalog-page {
  padding: 24px;
}
.catalog-selection {
  border-bottom: 1px solid #e5e7eb;
}
.catalog-items {
  margin-bottom: 16px;
}
.button-group {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}
.input-group {
  margin-bottom: 16px;
}
.button-label {
  width: 100px;
}
</style>
