export type entityCategoryValue =
  | "leads"
  | "contacts"
  | "companies";

export type entityCategoryTitle =
  | "Сделка"
  | "Контакт"
  | "Компания";

export type entityCategory = {
  title: entityCategoryTitle;
  value: entityCategoryValue;
};

export interface IEntity {
  id?: number;
  [key: string]: any;
}

export interface IEntityCategories {
  [key: string]: Array<IEntity>;
}
