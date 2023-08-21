import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMenu1692635093345 implements MigrationInterface {
    name = 'UpdateMenu1692635093345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "menu" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "menu" ALTER COLUMN "deletedAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu" ALTER COLUMN "deletedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu" ALTER COLUMN "updatedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "menu" ALTER COLUMN "createdAt" DROP DEFAULT`);
    }

}
