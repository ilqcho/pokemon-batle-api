import { DataSource } from 'typeorm';
import { Pokemon } from './database/entities/pokemon.entity';
import { SeedPokemonData1714328126468 } from './database/migrations/1714328126468-seedPokemonData';
import { Battle } from './database/entities/battle.entity';

export default new DataSource({
  migrationsTableName: 'migrations',
  type: 'sqlite',
  database: 'db/pokemon-battle',
  synchronize: true,
  dropSchema: true,
  migrations: [SeedPokemonData1714328126468],
  entities: [Pokemon, Battle],
});
