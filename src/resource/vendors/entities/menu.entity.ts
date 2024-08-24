import { AbstractEntity } from 'src/database';
import { FoodCategory } from 'src/enums/food-category.enum';
import { Column, Entity } from 'typeorm';

@Entity('menus')
export class Menu extends AbstractEntity<Menu> {
  @Column()
  name: string;
  @Column({ name: 'vendor_id' })
  vendorId: string;
  @Column({ type: 'enum', enum: FoodCategory, default: FoodCategory.MAIN_MENU })
  category: FoodCategory | string;
  @Column()
  price: number;
  @Column({ default: '' })
  image: string;
}
