import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({name: 'Events'})
export class Event {
@PrimaryGeneratedColumn()
id: number;

@Column({ length: 500 })
name: string;

@Column({length: 500})
location:string;

@Column()
duration: number;

@Column()
numberOfGuests: number;
}
