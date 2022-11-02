import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Equipment } from "./equipment.entity";

@Entity({ name: "user" }) /// we can set up the name of the table, otherwise, type orm will assign a similar name than the class name
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() /// like auto increment property
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    default: true,
  })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Equipment, (equip) => equip.user)
  equipment: Equipment[]
}
