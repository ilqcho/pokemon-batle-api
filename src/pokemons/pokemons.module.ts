import { Module } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { PokemonsController } from './pokemons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from 'src/database/entities/pokemon.entity';
import { Battle } from 'src/database/entities/battle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon, Battle])],
  providers: [PokemonsService],
  controllers: [PokemonsController],
})
export class PokemonsModule {}
