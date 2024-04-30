import { IsNotEmpty, IsString } from 'class-validator';

export class BattlePokemonsDto {
  @IsNotEmpty()
  @IsString()
  attackerId: string;

  @IsNotEmpty()
  @IsString()
  defenderId: string;
}

export class BattleResult {
  message: string;
}
