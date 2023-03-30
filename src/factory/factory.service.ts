import { Inject, Injectable } from '@nestjs/common';
import { Contract, JsonRpcProvider, Provider, Wallet } from 'ethers';
import { Response } from './interfaces/respose.interface';
import { BodyReq } from './interfaces/body.interface';
import factoryAbi from 'src/abi/factory.abi';
import { FactoryConfig } from 'src/config/interfaces/config.interfaces';

@Injectable()
export class FactoryService {
  provider: Provider;
  wallet: Wallet;
  contract: Contract;
  constructor(
    @Inject('FACTORY_CONFIG') private readonly config: FactoryConfig,
  ) {
    this.provider = new JsonRpcProvider(config.provider);
    this.wallet = new Wallet(config.privateKey, this.provider);
    this.contract = new Contract(
      config.contractAddress,
      factoryAbi,
      this.wallet,
    );
  }
  async deploy({ name, symbol, decimals, supply }: BodyReq): Promise<Response> {
    const tx = await this.contract.deployToken(name, symbol, decimals, supply);

    return { hash: tx.hash };
  }
}
