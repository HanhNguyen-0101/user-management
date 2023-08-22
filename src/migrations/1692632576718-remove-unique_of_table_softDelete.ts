import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUniqueOfTableSoftDelete1692632576718
  implements MigrationInterface
{
  name = 'RemoveUniqueOfTableSoftDelete1692632576718';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permission_group" DROP CONSTRAINT "UQ_032c209da98ae7c1a915b51c272"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "UQ_ae4578dcaed5adff96595e61660"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" DROP CONSTRAINT "UQ_240853a0c3353c25fb12434ad33"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permission" ADD CONSTRAINT "UQ_240853a0c3353c25fb12434ad33" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission_group" ADD CONSTRAINT "UQ_032c209da98ae7c1a915b51c272" UNIQUE ("name")`,
    );
  }
}
