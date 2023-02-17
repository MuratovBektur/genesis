<template>
  <select
    class="amocrm-dropdown"
    name="amocrm-dropdown-select"
    @change="onChangeOption($event)"
  >
    <option selected disabled hidden>
      {{ selected }}
    </option>
    <option
      v-for="option of options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.title }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { defineProps, toRefs, ref, defineEmits } from "vue";

const emit = defineEmits<{
  (e: "update:modelValue", id: string): void;
}>();

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array<{
      title: string;
      value: string;
    }>,
    required: true,
  },
  defaultValue: {
    type: String,
    required: true,
  },
});

const { options, defaultValue } = toRefs(props);

const selected = ref<string>(defaultValue.value);

function onChangeOption(event: Event) {
  const eventTarget = event.target as HTMLSelectElement;
  emit("update:modelValue", eventTarget.value);
}
</script>

<style lang="scss" scoped>
.amocrm-dropdown {
  padding: 5px 10px;
}
</style>
