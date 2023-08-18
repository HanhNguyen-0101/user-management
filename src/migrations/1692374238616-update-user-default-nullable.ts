import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserDefaultNullable1692374238616 implements MigrationInterface {
    name = 'UpdateUserDefaultNullable1692374238616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "refreshToken" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isPending" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isPending" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isDisable" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isDisable" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isDisable" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isDisable" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isPending" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isPending" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "refreshToken" SET NOT NULL`);
    }

}
