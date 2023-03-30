import { Inject, Injectable } from '@nestjs/common';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { FactoryConfig } from './interfaces/config.interfaces';

export class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  PROVIDER: string;

  @IsString()
  @IsNotEmpty()
  CONTRACT_ADDRESS: string;

  @IsString()
  @IsNotEmpty()
  PRIVATE_KEY: string;
}

@Injectable()
export class ConfigService {
  constructor(@Inject('ENV') private env: EnvironmentVariables) {
    this.env = this.validateConfig();
  }

  getFactoryConfig(): FactoryConfig {
    return {
      provider: this.env.PROVIDER,
      contractAddress: this.env.CONTRACT_ADDRESS,
      privateKey: this.env.PRIVATE_KEY,
    };
  }

  private validateConfig() {
    const validatedConfig = plainToClass(EnvironmentVariables, this.env, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    return validatedConfig;
  }
}
