import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import User from '../../../../user/infra/typeorm/entities/User';

import Course from '../../../../course/infra/typeorm/entities/Course';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  status: string;

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Course, {
    eager: true,
  })
  @JoinTable({
    name: 'orders_courses',
    joinColumn: {
      name: 'orderId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'courseId',
      referencedColumnName: 'id',
    },
  })
  courses: Course[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
