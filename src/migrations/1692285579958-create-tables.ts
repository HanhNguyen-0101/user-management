import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1692285579958 implements MigrationInterface {
    name = 'CreateTables1692285579958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "menu" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "deletedAt" TIMESTAMP NOT NULL, "key" character varying NOT NULL, "parentId" uuid, CONSTRAINT "UQ_947bcf4f014dbed7655bee5ee50" UNIQUE ("key"), CONSTRAINT "PK_35b2a8f47d153ff7a41860cceeb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission_group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "deletedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_b1372c1e0a14c1b45ab7cce7857" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "password" character varying NOT NULL, "isPending" boolean NOT NULL DEFAULT false, "isDisable" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "updatedBy" uuid NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "globalId" character varying NOT NULL, "officeCode" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_role" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "roleId" uuid NOT NULL DEFAULT uuid_generate_v4(), "assignedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_7b4e17a669299579dfa55a3fc35" PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "createdBy" uuid NOT NULL, "updatedBy" uuid NOT NULL, "description" text NOT NULL, "deletedAt" TIMESTAMP NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_permission" ("roleId" uuid NOT NULL DEFAULT uuid_generate_v4(), "permissionId" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_b42bbacb8402c353df822432544" PRIMARY KEY ("roleId", "permissionId"))`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "description" text NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "deletedAt" TIMESTAMP NOT NULL, "code" character varying NOT NULL, "permissionGroupId" uuid, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission_assign_log" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "actionPermissionLogActionType" character varying NOT NULL, "changesJson" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "createdBy" uuid NOT NULL, CONSTRAINT "PK_5339e04e6566e1713549b4e437e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "menu" ADD CONSTRAINT "FK_23ac1b81a7bfb85b14e86bd23a5" FOREIGN KEY ("parentId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_72e80be86cab0e93e67ed1a7a9a" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3130a39c1e4a740d044e685730" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "FK_29b093b202d3ae3e37438ce158c" FOREIGN KEY ("permissionGroupId") REFERENCES "permission_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_29b093b202d3ae3e37438ce158c"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3130a39c1e4a740d044e685730"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_72e80be86cab0e93e67ed1a7a9a"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"`);
        await queryRunner.query(`ALTER TABLE "menu" DROP CONSTRAINT "FK_23ac1b81a7bfb85b14e86bd23a5"`);
        await queryRunner.query(`DROP TABLE "permission_assign_log"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "role_permission"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "user_role"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "permission_group"`);
        await queryRunner.query(`DROP TABLE "menu"`);
    }

}
