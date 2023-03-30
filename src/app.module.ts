import { Module } from '@nestjs/common';
import { FactoryModule } from './factory/factory.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [FactoryModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
