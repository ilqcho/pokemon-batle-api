import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Battle } from './battle.entity';

@Entity('pokemon')
export class Pokemon {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'attack', nullable: false })
  attack: number;

  @Column({ name: 'defense', nullable: false })
  defense: number;

  @Column({ name: 'hp', nullable: false })
  hp: number;

  @Column({ name: 'speed', nullable: false })
  speed: number;

  @Column({ name: 'type', nullable: false })
  type: string;

  @Column({ name: 'imageUrl', nullable: false })
  imageUrl: string;

  @OneToMany(() => Battle, (battle) => battle.winner)
  wonBattles: Battle[];

  @OneToMany(() => Battle, (battle) => battle.loser)
  lostBattles: Battle[];
}
