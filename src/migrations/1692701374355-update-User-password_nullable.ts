import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserPasswordNullable1692701374355 implements MigrationInterface {
    name = 'UpdateUserPasswordNullable1692701374355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
    }

}
