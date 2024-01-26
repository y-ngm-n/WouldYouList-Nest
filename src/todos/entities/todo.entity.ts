import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum categoryType {
  FOOD = "FOOD",
  MOVIE = "MOVIE",
  ACTIVITY = "ACTIVITY",
  BOOK = "BOOK",
  MUSIC = "MUSIC",
  BAKING = "BAKING",
  SPORT = "SPORT"
};

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: string;

  @Column()
  name: string;

  @Column()
  date: string;

  @Column()
  category: categoryType;

  @Column()
  content: string;

  @Column()
  state: boolean;
  
  @Column({ default: null })
  review: number;
}