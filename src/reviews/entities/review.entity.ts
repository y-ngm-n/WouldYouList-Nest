import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  todoId: number;

  @Column()
  fileId: number;
  
  @Column()
  title: string;

  @Column()
  date: string;

  @Column()
  content: string;

  @Column()
  place: string;

  @Column()
  expression: string;
}