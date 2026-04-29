<template>
  <div v-if="visible" class="dialog-overlay">
    <div class="dialog">
      <h2 class="dialog__title">
        {{ title }}
      </h2>

      <p class="dialog__message">
        {{ message }}
      </p>

      <div class="dialog__actions">
        <BaseButton
          :label="cancelText"
          type="secondary"
          @click="$emit('cancel')"
        />

        <BaseButton :label="confirmText" @click="$emit('confirm')" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/common/BaseButton.vue";

export default {
  name: "ConfirmDialog",

  components: {
    BaseButton,
  },

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "確認",
    },
    message: {
      type: String,
      default: "",
    },
    confirmText: {
      type: String,
      default: "OK",
    },
    cancelText: {
      type: String,
      default: "キャンセル",
    },
  },
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1000;
}

.dialog {
  width: 420px;
  max-width: calc(100% - 32px);

  background: white;
  border-radius: 8px;
  padding: 24px;
}

.dialog__title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: bold;
}

.dialog__message {
  margin: 0 0 24px;
  line-height: 1.6;
  color: #4b5563;
}

.dialog__actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
