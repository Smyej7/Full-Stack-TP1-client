export interface Category {
    id: number;
    name: string;
    creationDate: Date;
    parent?: Category;
    isRoot: boolean;
    children?: Category[];
  }
  