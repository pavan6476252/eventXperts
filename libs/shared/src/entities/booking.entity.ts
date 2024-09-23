import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@ObjectType()
@Entity()
export class Booking {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  eventName: string;

  @Field()
  @Column()
  eventDate: string;

  @Field()
  @Column()
  contactInfo: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column("json")
  itemsBooked: string[];

  // @Field(() => User)
  // @ManyToOne(() => User, (user) => user.bookings)
  // user: User;
}
