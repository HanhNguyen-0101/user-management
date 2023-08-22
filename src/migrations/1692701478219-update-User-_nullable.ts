import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser_nullable1692701478219 implements MigrationInterface {
    name = 'UpdateUser_nullable1692701478219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "globalId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "officeCode" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "country" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "country" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "officeCode" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "globalId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastName" SET NOT NULL`);
    }

}
