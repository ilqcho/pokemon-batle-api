import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonsModule } from './pokemons/pokemons.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './database/entities/pokemon.entity';
import { Battle } from './database/entities/battle.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/pokemon-battle',
      synchronize: true,
      dropSchema: false,
      entities: [Pokemon, Battle],
    }),
    PokemonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
