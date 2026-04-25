<template>
  <label class="base-checkbox">
    <input
      type="checkbox"
      class="base-checkbox__input"
      :checked="value"
      :disabled="disabled"
      @change="handleChange"
    />

    <span class="base-checkbox__label">
      {{ label }}
    </span>
  </label>
</template>

<script>
export default {
  name: "BaseCheckbox",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleChange(event) {
      this.$emit("input", event.target.checked);
    },
  },
};
</script>

<style scoped>
.base-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.base-checkbox__input {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.base-checkbox__label {
  font-size: 14px;
  color: #374151;
}

.base-checkbox__input:disabled,
.base-checkbox__input:disabled + .base-checkbox__label {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
