<template>
  <div class="base-select">
    <label v-if="label" class="base-select__label">
      {{ label }}
    </label>

    <select
      class="base-select__field"
      :value="value"
      :disabled="disabled"
      @change="handleChange"
    >
      <option v-if="placeholder" value="" disabled>
        {{ placeholder }}
      </option>

      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "BaseSelect",
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: "選択してください",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleChange(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style scoped>
.base-select {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.base-select__label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.base-select__field {
  height: 40px;
  padding: 0 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  outline: none;
}

.base-select__field:focus {
  border-color: #2563eb;
}

.base-select__field:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}
</style>
