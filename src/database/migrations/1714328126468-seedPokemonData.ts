import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedPokemonData1714328126468 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO pokemon (id, name, attack, defense, hp, speed, type, imageUrl)
      VALUES
        ('pokemon-1', 'Pikachu', 4, 3, 3, 6, 'Type', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png'),
        ('pokemon-2', 'Charmander', 4, 3, 3, 4, 'Type', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png'),
        ('pokemon-3', 'Squirtle', 3, 4, 3, 3, 'Type', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png'),
        ('pokemon-4', 'Bulbasur', 4, 3, 3, 3, 'Type', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png'),
        ('pokemon-5', 'Eevee', 4, 3, 4, 5, 'Type', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/133.png');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM pokemon;`);
  }
}
