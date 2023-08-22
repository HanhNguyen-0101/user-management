import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleUniqueOfTableSoftDelete1692634606241
  implements MigrationInterface
{
  name = 'AddRoleUniqueOfTableSoftDelete1692634606241';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "UQ_ae4578dcaed5adff96595e61660"`,
    );
  }
}
