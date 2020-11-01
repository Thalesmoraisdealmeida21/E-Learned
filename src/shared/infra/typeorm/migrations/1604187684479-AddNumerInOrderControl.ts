import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddNumerInOrderControl1604187684479
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'numero',
        type: 'int',
        isGenerated: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'numero');
  }
}
