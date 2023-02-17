<script setup lang="ts">
import { ref, computed } from "vue";

import { useAmocrmEntityStore } from "@/stores/amocrmEntity";
import type {
  entityCategoryValue,
  entityCategory,
} from "@/types";

import BtnComponent from "@/components/btn.vue";
import DropdownComponent from "@/components/dropdown.vue";
import EntitiesComponent from "@/components/entities.vue";

const amocrmEntityStore = useAmocrmEntityStore();

const loading = ref<boolean>(false);
const options: Array<entityCategory> = [
  {
    title: "Сделка",
    value: "leads",
  },
  {
    title: "Контакт",
    value: "contacts",
  },
  {
    title: "Компания",
    value: "companies",
  },
];
const selectedEntity = ref<entityCategoryValue | "">("");

async function fetch() {
  if (!selectedEntity.value) return;
  try {
    loading.value = true;
    await amocrmEntityStore.fetchEntity(
      selectedEntity.value
    );
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

const entityCategories = computed(
  () => amocrmEntityStore.entityCategories
);
</script>

<template>
  <div class="amocrm-panel">
    <div class="amocrm-panel__content">
      <dropdown-component
        v-model="selectedEntity"
        :options="options"
        :defaultValue="'Выберите сущность'"
      />
      <btn-component
        :disabled="!selectedEntity"
        :loading="loading"
        @click="fetch"
      >
        Создать
      </btn-component>
      <entities-component
        :options="options"
        :entityCategories="entityCategories"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

*,
*:before,
*:after {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.amocrm-panel {
  min-height: 100vh;
  display: flex;
  margin-top: 30px;
  justify-content: center;
  &__content {
    display: flex;
    flex-direction: column;
    & > *:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}
</style>
