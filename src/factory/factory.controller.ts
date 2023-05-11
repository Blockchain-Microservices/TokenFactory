import { Body, Controller, Post } from '@nestjs/common';
import { FactoryService } from './factory.service';
import { DeployTokenDto } from './Dto/deployToken.dto';
import { TokenManagerService } from '../token-manager/token-manager.service';

@Controller('factory')
export class FactoryController {
  constructor(
    private factoryService: FactoryService,
    private tokenManagerService: TokenManagerService,
  ) {}
  @Post()
  async tokenFactory(@Body() deployTokenDto: DeployTokenDto) {
    const { name, symbol, decimals, supply } = deployTokenDto;
    const { txHash } = await this.factoryService.deploy({
      name,
      symbol,
      decimals,
      supply,
    });
    await this.tokenManagerService.createToken({
      name,
      symbol,
      decimals,
      supply,
      txHash,
    });
    return { txHash };
  }
}
