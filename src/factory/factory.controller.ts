import { Body, Controller, Post } from '@nestjs/common';
import { FactoryService } from './factory.service';
import { DeployTokenDto } from './Dto/deployToken.dto';

@Controller('factory')
export class FactoryController {
  constructor(private factoryService: FactoryService) {}
  @Post()
  async tokenFactory(@Body() deployTokenDto: DeployTokenDto) {
    const { name, symbol, decimals, supply } = deployTokenDto;
    return await this.factoryService.deploy({ name, symbol, decimals, supply });
  }
}
