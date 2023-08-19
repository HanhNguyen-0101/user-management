import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserExpandRelation1692465595417 implements MigrationInterface {
    name = 'UpdateUserExpandRelation1692465595417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_a19025a009be58684a63961aaf3" FOREIGN KEY ("updatedBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_a19025a009be58684a63961aaf3"`);
    }

}
