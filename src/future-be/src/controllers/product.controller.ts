// src/users/usersController.ts
import {
  Controller,
  Get,
  Post,
  Route,
  Tags,
  Path,
  FormField,
  UploadedFiles,
  Put,
  Delete,
  Query,
  Security,
} from "tsoa";
import { ProductService } from "../services";
import { CreateProductDTO, UpdateProductDTO } from "../dto/request/product.dto";

@Tags("Products")
@Route("products")
export class ProductsController extends Controller {
  @Post()
  public async createProduct(
    @FormField("name") name: string,
    @FormField("category") category: string,
    @FormField("quantity") quantity: number,
    @FormField("price") price: number,
    @FormField("description") description: string,
    @UploadedFiles("images")
    images: Express.Multer.File[]
  ) {
    console.log("images: ", images);
    const dto: CreateProductDTO = {
      category,
      description,
      name,
      price,
      quantity,
    };
    return ProductService.createProduct(dto, images);
  }

  @Put("/{productId}")
  public updateProduct(
    @Path("productId") productId: string,
    @FormField("name") name?: string,
    @FormField("category") category?: string,
    @FormField("quantity") quantity?: number,
    @FormField("price") price?: number,
    @FormField("description") description?: string,
    @FormField("updateImageField") updateImageField?: string,
    @UploadedFiles("images")
    images?: Express.Multer.File[]
  ) {
    const dto: UpdateProductDTO = {
      name,
      category,
      price,
      quantity,
      description,
      updateImageField,
    };
    return ProductService.updateProduct(productId, dto, images ? images : []);
  }

  @Delete("/{productId}")
  public deleteProduct(@Path("productId") productId: string) {
    return ProductService.deleteProduct(productId);
  }

  @Get("/pagination")
  public getProductsPagination(
    @Query("limit") limit: number,
    @Query("page") page: number
  ) {
    return ProductService.getProductsPagination(limit, page);
  }

  @Get("/update/{productId}")
  public async getProductForUpdate(@Path() productId: string) {
    return ProductService.getProductForUpdate(productId);
  }

  @Get("/newest")
  public async getNewestProds() {
    return ProductService.getNewestProduct();
  }

  @Get("/filter")
  public async filterProducts(
    @Query() limit: number,
    @Query() page: number,
    @Query() category?: string,
    @Query() search?: string,
    @Query() from?: number,
    @Query() to?: number,
    @Query() sort?: string
  ) {
    return ProductService.filterProduct(
      limit,
      page,
      category,
      search,
      from,
      to,
      sort
    );
  }

  @Get("/max-price")
  public async getMaxPrice(@Query("category") category?: string) {
    return ProductService.findMaxPrice(category);
  }

  @Security("jwt", ["admin"])
  @Get("/count-products")
  public countProducts() {
    return ProductService.countProducts();
  }

  @Get("/{productId}")
  public async getProductById(@Path() productId: string) {
    return ProductService.getProductById(productId);
  }
}
