import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "equipment" }) /// we can set up the name of the table, otherwise, type orm will assign a similar name than the class name
export class Equipment extends BaseEntity {
  @PrimaryGeneratedColumn() /// like auto increment property
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column({
    unique: true,
  })
  serial: string;

  @Column({
    default: true,
  })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.equipment)
  @JoinColumn({ name: "user_id" })
  user: User;
}
