import { IsNumber, IsString } from 'class-validator';
import { FoodCategory } from 'src/enums/food-category.enum';

export class CreateMenuDto {
  name: string;
  @IsString()
  vendorId: string;
  @IsString()
  category: FoodCategory | string;
  @IsNumber()
  price: number;
  @IsString()
  image: string;
}
