export class CategoryAdminRes {
  _id: string;
  name: string;
  image: string;
}

export class CategoryClientRes extends CategoryAdminRes {
  numberOfProducts: number;
}
