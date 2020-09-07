import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddValidInTableUsersCourses1599506521951
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users_courses',
      new TableColumn({
        name: 'limitAccess',
        type: 'timestamp',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users_courses', 'limitAccess');
  }
}
