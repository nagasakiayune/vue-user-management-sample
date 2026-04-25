<template>
  <div class="base-input">
    <label v-if="label" class="base-input__label">
      {{ label }}
    </label>

    <input
      class="base-input__field"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="handleInput"
    />
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleInput(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.base-input__label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.base-input__field {
  height: 40px;
  padding: 0 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

.base-input__field:focus {
  border-color: #2563eb;
}

.base-input__field:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}
</style>
