export class CreateProductDTO {
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
}

export class UpdateProductDTO {
  name?: string;
  category?: string;
  price?: number;
  quantity?: number;
  description?: string;
  updateImageField?: string;
}

export class Pagination {
  limit: number;
  page: number;
}
