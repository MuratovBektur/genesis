<template>
  <div v-if="showComponent" class="amocrm-entity">
    <div
      class="amocrm-entity__category"
      v-for="(entities, value) of entityCategories"
      :key="value"
    >
      <div class="amocrm-entity__category-title">
        {{ getTitle(String(value)) }}
      </div>
      <div
        class="amocrm-entity__category-item"
        v-for="entity of entities"
        :key="`${value}${entity.id}`"
      >
        {{ entity.id }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs, computed } from "vue";
import type { PropType } from "vue";
import type {
  IEntityCategories,
  entityCategory,
} from "@/types";

const props = defineProps({
  entityCategories: {
    type: Object as PropType<IEntityCategories>,
    required: true,
  },
  options: {
    type: Array as PropType<Array<entityCategory>>,
    required: true,
  },
});

const { entityCategories, options } = toRefs(props);

const showComponent = computed(
  () => Object.keys(entityCategories).length > 0
);

function getTitle(value: string) {
  const entityCategory = options.value.find(
    (entity) => entity.value === value
  );
  return entityCategory?.title || value;
}
</script>

<style lang="scss" scoped>
.amocrm-entity {
  &__category {
    min-width: 100px;
    text-align: center;
    &:not(:last-child) {
      margin-bottom: 15px;
    }
    &-title {
      padding: 2px 0;
      color: white;
      background-color: $blue;
      margin-bottom: 10px;
    }
    &-item {
      padding: 2px 0;
      color: $blue;
      border: 1px solid $blue;
      margin-bottom: 10px;
    }
  }
}
</style>
