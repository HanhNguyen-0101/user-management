import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRolesFieldsExpandCreatedByUpdatedBy1692586295897
  implements MigrationInterface
{
  name = 'UpdateRolesFieldsExpandCreatedByUpdatedBy1692586295897';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ALTER COLUMN "deletedAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "FK_64a1786ac86cd459077a53f411f" FOREIGN KEY ("updatedBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "FK_17be5172ac2f4c67687a2e7c67d" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "FK_17be5172ac2f4c67687a2e7c67d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "FK_64a1786ac86cd459077a53f411f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ALTER COLUMN "deletedAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ALTER COLUMN "updatedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ALTER COLUMN "createdAt" DROP DEFAULT`,
    );
  }
}
