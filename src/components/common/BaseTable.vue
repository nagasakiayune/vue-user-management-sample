<template>
  <div class="base-table-wrapper">
    <table class="base-table">
      <!-- ヘッダー -->
      <thead>
        <tr>
          <th v-for="field in fields" :key="field.key">
            {{ field.label }}
          </th>
        </tr>
      </thead>

      <!-- ボディ -->
      <tbody>
        <tr v-for="(item, rowIndex) in items" :key="rowIndex">
          <td v-for="field in fields" :key="field.key">
            <!-- slot優先 -->
            <slot :name="`cell(${field.key})`" :item="item">
              {{ item[field.key] }}
            </slot>
          </td>
        </tr>

        <!-- データなし -->
        <tr v-if="items.length === 0">
          <td :colspan="fields.length" class="base-table__empty">
            データがありません
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "BaseTable",
  props: {
    fields: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.base-table-wrapper {
  overflow-x: auto;
}

.base-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border: 1px solid #e5e7eb;
}

.base-table th {
  background: #e5e7eb;
  text-align: left;
  padding: 12px;
  font-size: 14px;
  font-weight: 700;
  border-bottom: 1px solid #d1d5db;
}

.base-table td {
  padding: 12px;
  font-size: 14px;
  border-bottom: 1px solid #e5e7eb;
}

.base-table tbody tr:hover {
  background: #f9fafb;
}

.base-table__empty {
  text-align: center;
  padding: 24px;
  color: #6b7280;
}
</style>
