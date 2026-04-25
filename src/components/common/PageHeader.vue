<template>
  <div class="page-header">
    <div class="page-header__left">
      <h1 class="page-header__title">
        {{ title }}
      </h1>

      <p v-if="description" class="page-header__description">
        {{ description }}
      </p>
    </div>

    <div v-if="$slots.default" class="page-header__right">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding-bottom: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.page-header__left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.page-header__title {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  color: #111827;
}

.page-header__description {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}

.page-header__right {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
