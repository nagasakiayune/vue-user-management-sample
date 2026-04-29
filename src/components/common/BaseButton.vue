<template>
  <button
    class="base-button"
    :class="buttonClass"
    :disabled="disabled"
    @click="handleClick"
  >
    <span v-if="icon" class="base-button__icon">
      <SearchIcon v-if="icon === 'search'" />
      <PlusIcon v-else-if="icon === 'plus'" />
    </span>
    {{ label }}
  </button>
</template>

<script>
import SearchIcon from "@/components/icons/SearchIcon.vue";
import PlusIcon from "../icons/PlusIcon.vue";

export default {
  name: "BaseButton",
  components: {
    SearchIcon,
    PlusIcon,
  },
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
    icon: {
      type: String,
      default: "",
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 120px;
  height: 40px;
  padding: 0 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
}
.base-button__icon {
  display: flex;
  align-items: center;
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
