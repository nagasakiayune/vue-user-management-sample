<template>
  <div class="base-input">
    <label v-if="label" class="base-input__label">
      {{ label }}
    </label>

    <div class="base-input__wrapper">
      <span v-if="icon" class="base-input__icon">
        <SearchIcon v-if="icon === 'search'" />
        <PlusIcon v-else-if="icon === 'plus'" />
      </span>

      <input
        class="base-input__field"
        :class="{ 'has-icon': icon }"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="handleInput"
      />
    </div>
  </div>
</template>

<script>
import SearchIcon from "@/components/icons/SearchIcon.vue";
import PlusIcon from "../icons/PlusIcon.vue";

export default {
  name: "BaseInput",
  components: {
    SearchIcon,
    PlusIcon,
  },
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
    icon: {
      type: String,
      default: "",
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

.base-input__wrapper {
  position: relative;
}

/* アイコン */
.base-input__icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
}

.base-input__field {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

/* アイコンありのとき余白追加 */
.base-input__field.has-icon {
  padding-left: 36px;
}

.base-input__field:focus {
  border-color: #2563eb;
}

.base-input__field:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}
</style>
