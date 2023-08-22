import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePermissionGroupUuidStringGenerateDateNameUnique1692610242877
  implements MigrationInterface
{
  name = 'UpdatePermissionGroupUuidStringGenerateDateNameUnique1692610242877';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permission_group" ADD CONSTRAINT "UQ_032c209da98ae7c1a915b51c272" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission_group" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission_group" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission_group" ALTER COLUMN "deletedAt" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permission_group" ALTER COLUMN "deletedAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission_group" ALTER COLUMN "updatedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission_group" ALTER COLUMN "createdAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission_group" DROP CONSTRAINT "UQ_032c209da98ae7c1a915b51c272"`,
    );
  }
}
