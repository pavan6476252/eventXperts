import { ROLE_TYPE } from "@app/shared";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./roles.entity";
import { Booking } from "./booking.entity";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryColumn("uuid")
  id: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field((type) => [Role])
  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  // @Field(() => [Booking])
  // @OneToMany(() => Booking, (booking) => booking.user)
  // bookings: Booking[];
}
