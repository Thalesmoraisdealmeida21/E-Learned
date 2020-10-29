import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import Course from '../../../../course/infra/typeorm/entities/Course';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  cep: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  level: string;

  @ManyToMany(() => Course)
  @JoinTable({
    name: 'users_courses',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'course_id',
      referencedColumnName: 'id',
    },
  })
  courses: Course[];

  @Column()
  address: string;

  @Column()
  telephone: string;

  @Column()
  cpfCnpj: string;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  uf: string;

  @Column()
  addressNumber: string;

  @Column()
  complement: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
