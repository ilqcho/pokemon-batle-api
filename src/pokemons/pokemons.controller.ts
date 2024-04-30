import { Controller, Get, Post, Body } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { BattlePokemonsDto } from './pokemons.dto';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  async getPokemons() {
    const pokemons = await this.pokemonsService.getAllPokemons();
    return { pokemons };
  }

  @Post('battle')
  async battlePokemons(@Body() body: BattlePokemonsDto) {
    const result = await this.pokemonsService.battlePokemons(body);
    return result;
  }
}
