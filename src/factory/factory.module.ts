import { Module, Provider } from '@nestjs/common';
import { FactoryController } from './factory.controller';
import factoryAbi from '../abi/factory.abi';
import { FactoryService } from './factory.service';
import { ConfigService } from 'src/config/config.service';
import { ConfigModule } from 'src/config/config.module';
import { FactoryConfig } from 'src/config/interfaces/config.interfaces';
import { TokenManagerModule } from '../token-manager/token-manager.module';

const abi: Provider = {
  provide: 'ABI',
  useValue: factoryAbi,
};
const factoryConfig: Provider = {
  provide: 'FACTORY_CONFIG',
  useFactory: (configService: ConfigService): FactoryConfig =>
    configService.getFactoryConfig(),
  inject: [ConfigService],
};

@Module({
  imports: [ConfigModule, TokenManagerModule],
  controllers: [FactoryController],
  providers: [FactoryService, abi, factoryConfig],
})
export class FactoryModule {}
