import { Inject, Injectable } from '@nestjs/common';
import { TokenManagerConfig } from '../config/interfaces/config.interfaces';
import axios from 'axios';
import { DeployTokenDto } from '../factory/Dto/deployToken.dto';

@Injectable()
export class TokenManagerService {
  constructor(
    @Inject('TOKEN_MANAGER_CONFIG') private config: TokenManagerConfig,
  ) {}

  async createToken(token: DeployTokenDto & { txHash: string }) {
    const { name, symbol, decimals, supply, txHash } = token;
    const url = `${this.config.url}/token`;
    try {
      const response = await axios.post(url, {
        name,
        symbol,
        decimals,
        supply,
        txHash,
      });
      return response.data;
    } catch (error) {
      // Handle error
      console.error(error);
      throw error;
    }
  }
}
