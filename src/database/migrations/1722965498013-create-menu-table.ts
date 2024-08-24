import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMenuTable1722965498013 implements MigrationInterface {
  name = 'CreateMenuTable1722965498013';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."menus_category_enum" AS ENUM('swallow', 'protein', 'drinks', 'main menu', 'others')`,
    );
    await queryRunner.query(
      `CREATE TABLE "menus" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "vendor_id" character varying NOT NULL, "category" "public"."menus_category_enum" NOT NULL DEFAULT 'main menu', "price" integer NOT NULL, "image" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_3fec3d93327f4538e0cbd4349c4" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "menus"`);
    await queryRunner.query(`DROP TYPE "public"."menus_category_enum"`);
  }
}
