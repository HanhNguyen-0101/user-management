import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUserRefreshToken1692691670964 implements MigrationInterface {
  name = 'RemoveUserRefreshToken1692691670964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "refreshToken" character varying`,
    );
  }
}
