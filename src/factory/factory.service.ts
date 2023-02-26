import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { Contract, JsonRpcProvider, Provider, Wallet } from 'ethers';
import { Response } from './interfaces/respose.interface';
import { BodyReq } from './interfaces/body.interface';

const factoryAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'deployer',
        type: 'address',
      },
    ],
    name: 'TokenDeployed',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'string', name: 'tokenName', type: 'string' },
      { internalType: 'string', name: 'tokenSymbol', type: 'string' },
      { internalType: 'uint8', name: 'decimals', type: 'uint8' },
      { internalType: 'uint256', name: 'supply', type: 'uint256' },
    ],
    name: 'deployToken',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'deployedTokens',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
];

@Injectable()
export class FactoryService {
  provider: Provider;
  wallet: Wallet;
  contract: Contract;
  config = dotenv.config().parsed;
  constructor() {
    this.provider = new JsonRpcProvider(this.config.PROVIDER);
    this.wallet = new Wallet(this.config.PRIVATE_KEY, this.provider);
    this.contract = new Contract(
      this.config.CONTRACT_ADDRESS,
      factoryAbi,
      this.wallet,
    );
  }
  async deploy({ name, symbol, decimals, supply }: BodyReq): Promise<Response> {
    const tx = await this.contract.deployToken(name, symbol, decimals, supply);

    return { hash: tx.hash };
  }
}
