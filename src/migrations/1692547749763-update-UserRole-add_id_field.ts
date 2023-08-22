import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserRoleAddIdField1692547749763
  implements MigrationInterface
{
  name = 'UpdateUserRoleAddIdField1692547749763';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "PK_7b4e17a669299579dfa55a3fc35"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "PK_1a22908dd79ca1aa8fdbeb547d5" PRIMARY KEY ("userId", "roleId", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "PK_1a22908dd79ca1aa8fdbeb547d5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "PK_4938d101b3eb889fa8fa622f9dd" PRIMARY KEY ("roleId", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ALTER COLUMN "userId" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "PK_4938d101b3eb889fa8fa622f9dd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ALTER COLUMN "roleId" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ALTER COLUMN "assignedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ALTER COLUMN "assignedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ALTER COLUMN "roleId" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "PK_4938d101b3eb889fa8fa622f9dd" PRIMARY KEY ("roleId", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ALTER COLUMN "userId" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "PK_4938d101b3eb889fa8fa622f9dd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "PK_1a22908dd79ca1aa8fdbeb547d5" PRIMARY KEY ("userId", "roleId", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "PK_1a22908dd79ca1aa8fdbeb547d5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "PK_7b4e17a669299579dfa55a3fc35" PRIMARY KEY ("userId", "roleId")`,
    );
    await queryRunner.query(`ALTER TABLE "user_role" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
