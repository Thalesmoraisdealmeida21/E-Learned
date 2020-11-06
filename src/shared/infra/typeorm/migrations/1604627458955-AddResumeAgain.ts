import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddResumeAgain1604627458955 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'courses',
      new TableColumn({
        name: 'resume',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('courses', 'resume');
  }
}
