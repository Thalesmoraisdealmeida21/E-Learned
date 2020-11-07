import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('depoiments')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  person: string;

  @Column()
  depoiment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
