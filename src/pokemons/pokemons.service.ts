import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { Pokemon } from 'src/database/entities/pokemon.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BattlePokemonsDto, BattleResult } from './pokemons.dto';
import { Battle } from 'src/database/entities/battle.entity';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    @InjectRepository(Battle)
    private readonly battleRepository: Repository<Battle>,
  ) {}

  /**
   * Retrieves all Pokémon from the repository.
   * @returns {Promise<Pokemon[]>} - A promise resolving with an array of all Pokémon.
   */
  async getAllPokemons(): Promise<Pokemon[]> {
    return await this.pokemonRepository.find();
  }

  /**
   * Finds and returns a Pokémon by its ID.
   * @param {string} id - The ID of the Pokémon to find.
   * @returns {Promise<Pokemon>} - A promise resolving with the Pokémon found.
   * @throws {NotFoundException} - If the Pokémon with the specified ID is not found.
   */
  async findPokemonById(id: string): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOne({
      where: { id },
    });

    if (!pokemon) {
      throw new NotFoundException('Pokemon not found.');
    }

    return pokemon;
  }

  /**
   * Determines which Pokémon attacks first and second based on their speed stats.
   * @param {Pokemon} attacker - The Pokémon initiating the attack.
   * @param {Pokemon} defender - The Pokémon being attacked.
   * @returns {Promise<[Pokemon, Pokemon]>} - A promise resolving with an array containing the first attacker Pokémon and the second attacker Pokémon.
   */
  async determineFirstAttacker(
    attacker: Pokemon,
    defender: Pokemon,
  ): Promise<[Pokemon, Pokemon]> {
    let firstAttacker = attacker;
    let secondAttacker = defender;

    if (attacker.speed === defender.speed) {
      if (attacker.attack < defender.attack) {
        [firstAttacker, secondAttacker] = [defender, attacker];
      }
    } else if (attacker.speed < defender.speed) {
      [firstAttacker, secondAttacker] = [defender, attacker];
    }

    return [firstAttacker, secondAttacker];
  }

  /**
   * Method to simulate a battle between two Pokemon and determine the winner.
   * @param {BattlePokemonsDto} body - Object containing the IDs of the Pokemon participating in the battle.
   * @returns {Promise<BattleResult>} - A promise resolving with the name of the winning Pokémon.
   * @throws {BadRequestException} - If the Pokémon IDs are the same.
   * @throws {ConflictException} - If no winner is found after the battle.
   */
  async battlePokemons(body: BattlePokemonsDto): Promise<BattleResult> {
    const { attackerId, defenderId } = body;
    const attacker = await this.findPokemonById(attackerId);
    const defender = await this.findPokemonById(defenderId);

    if (defender.id === attacker.id) {
      throw new BadRequestException('Select two different pokemons');
    }

    const [firstAttacker, secondAttacker] = await this.determineFirstAttacker(
      attacker,
      defender,
    );

    while (firstAttacker.hp > 0 && secondAttacker.hp > 0) {
      let damage = firstAttacker.attack - secondAttacker.defense;
      if (damage <= 0) {
        damage = 1;
      }
      secondAttacker.hp -= damage;

      if (secondAttacker.hp <= 0) {
        await this.saveBattle(firstAttacker, secondAttacker);
        return { message: firstAttacker.name + ' wins!' };
      }

      damage = secondAttacker.attack - firstAttacker.defense;
      if (damage <= 0) {
        damage = 1;
      }
      firstAttacker.hp -= damage;

      if (firstAttacker.hp <= 0) {
        await this.saveBattle(secondAttacker, firstAttacker);
        return { message: secondAttacker.name + ' wins!' };
      }
    }

    throw new ConflictException('Unexpected condition: No winner found');
  }

  /**
   * Saves battle data in the database.
   * @param {Pokemon} winner - The winning Pokémon.
   * @param {Pokemon} loser - The losing Pokémon.
   * @returns {Promise<void>} - A promise that resolves when the battle data is saved.
   */
  async saveBattle(winner: Pokemon, loser: Pokemon): Promise<void> {
    const battle = new Battle();
    battle.winnerId = winner.id;
    battle.loserId = loser.id;
    await this.battleRepository.save(battle);
  }
}
