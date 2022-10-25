import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Config {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, default: '1' })
  version: string;

  @Column({ length: 20 })
  service: string;

  @Column('simple-json')
  data: JSON[];
}
