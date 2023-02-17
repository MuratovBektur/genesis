<template>
  <button
    class="amocrm-btn"
    :class="{
      'amocrm-btn_disabled': disabled,
      'amocrm-btn_loading': loading,
    }"
    :disabled="disabled || loading"
  >
    <div v-if="loading" class="amocrm-btn__spinner"></div>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from "vue";

const props = defineProps({
  disabled: {
    type: Boolean,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
});

const { disabled, loading } = toRefs(props);
</script>

<style lang="scss" scoped>
$loader-width: 15px;
$white: white;
.amocrm-btn {
  background-color: $blue;
  font-size: 14px;
  padding: 5px 10px;
  color: $white;
  border-radius: 4px;
  min-height: 30px;

  min-width: 100px;
  font-weight: bold;
  cursor: pointer;
  &_disabled {
    cursor: not-allowed;
    background-color: $white;
    border: 1px solid black;
    color: black;
  }
  &_loading {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: wait;
  }
  &__spinner {
    display: inline-block;
    width: $loader-width;
    height: $loader-width;
    border: 2px solid transparent;
    border-radius: 50%;
    border-top-color: $white;
    border-right-color: $white;
    animation: spin 1s linear infinite;
    -webkit-animation: spin 1s linear infinite;
  }
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
}
</style>
