<template>
  <button
    class="base-button"
    :class="buttonClass"
    :disabled="disabled"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "primary",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonClass() {
      return `base-button--${this.type}`;
    },
  },
  methods: {
    handleClick(event) {
      if (this.disabled) return;
      this.$emit("click", event);
    },
  },
};
</script>

<style scoped>
.base-button {
  min-width: 120px;
  height: 40px;
  padding: 0 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
}

/* Primary */
.base-button--primary {
  background: #2563eb;
  color: white;
}

/* Secondary */
.base-button--secondary {
  background: #e5e7eb;
  color: #111827;
}

/* Danger */
.base-button--danger {
  background: #dc2626;
  color: white;
}

.base-button:hover:not(:disabled) {
  opacity: 0.9;
}

.base-button:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}
</style>
