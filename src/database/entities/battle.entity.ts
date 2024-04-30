import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Entity('battle')
export class Battle {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  winnerId: string;

  @Column({ nullable: false })
  loserId: string;

  @ManyToOne(() => Pokemon, (pokemon) => pokemon.wonBattles)
  winner: Pokemon;

  @ManyToOne(() => Pokemon, (pokemon) => pokemon.lostBattles)
  loser: Pokemon;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;
}
