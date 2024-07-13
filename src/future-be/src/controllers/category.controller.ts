import {
  Controller,
  Delete,
  FormField,
  Get,
  Path,
  Post,
  Put,
  Route,
  Tags,
  UploadedFile,
} from "tsoa";
import { CategoryService } from "../services/category.service";

@Tags("Categories")
@Route("categories")
export class CategoryController extends Controller {
  @Get()
  public getCategories() {
    return CategoryService.getMany();
  }

  @Post()
  public createCategory(
    @FormField() name: string,
    @UploadedFile("file") file: Express.Multer.File
  ) {
    return CategoryService.create(name, file);
  }

  @Put("/{id}")
  public updateCategory(
    @Path() id: string,
    @FormField() name?: string,
    @UploadedFile("file") file?: Express.Multer.File
  ) {
    console.log("name: ", name);
    return CategoryService.update(id, name, file);
  }

  @Delete("/{id}")
  public deleteCategory(@Path() id: string) {
    return CategoryService.delete(id);
  }
}
