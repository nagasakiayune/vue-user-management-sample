<template>
  <div v-if="totalPages > 1" class="base-pagination">
    <button
      class="base-pagination__button"
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
    >
      ＜
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      class="base-pagination__button"
      :class="{ 'is-active': page === currentPage }"
      @click="changePage(page)"
    >
      {{ page }}
    </button>

    <button
      class="base-pagination__button"
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
    >
      ＞
    </button>
  </div>
</template>

<script>
export default {
  name: "BasePagination",

  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPages: {
      type: Number,
      default: 1,
    },
  },

  methods: {
    changePage(page) {
      if (page < 1 || page > this.totalPages) return;

      this.$emit("change", page);
    },
  },
};
</script>

<style scoped>
.base-pagination {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.base-pagination__button {
  min-width: 36px;
  height: 36px;
  padding: 0 12px;

  border: none;
  border-radius: 6px;

  background: white;
  cursor: pointer;
}

.base-pagination__button:hover:not(:disabled) {
  border-color: #2563eb;
}

.base-pagination__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.is-active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}
</style>
