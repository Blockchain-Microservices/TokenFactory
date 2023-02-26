import { IsNumber, IsString } from 'class-validator';

export class DeployTokenDto {
  @IsString()
  name: string;
  @IsString()
  symbol: string;
  @IsNumber()
  decimals: number;
  @IsNumber()
  supply: number;
}
