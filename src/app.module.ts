import { Module } from '@nestjs/common';
import { FactoryModule } from './factory/factory.module';

@Module({
  imports: [FactoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
