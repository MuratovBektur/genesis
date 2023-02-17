import type {
  entityCategoryValue,
  IEntityCategories,
} from "@/types";
import { defineStore } from "pinia";
import axios from "axios";

export const useAmocrmEntityStore = defineStore(
  "amocrmEntityId",
  {
    state: () => {
      return {
        entityCategories: {} as IEntityCategories,
      };
    },
    actions: {
      async fetchEntity(type: entityCategoryValue) {
        const url = `/api/amocrm/${type}`;
        const { data } = await axios.post(url);
        const entity = data?._embedded?.[type]?.[0];
        if (entity) {
          if (!this.entityCategories[type]) {
            this.entityCategories[type] = [];
          }
          this.entityCategories[type].push(entity);
        }
      },
    },
  }
);
