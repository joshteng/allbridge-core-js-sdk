import Cache from "timed-cache";
import { ChainSymbol } from "../../chains";
import { PoolInfoMap, PoolKeyObject } from "../../tokens-info";
import { ApiClient, TokenInfo } from "./api-client";
import {
  ReceiveTransactionCostRequest,
  ReceiveTransactionCostResponse,
  TransferStatusResponse,
} from "./core-api.model";

const _20_SECONDS_TTL = 20 * 1000;
const TWO_MINUTES_TTL = 120 * 1000;

export class ApiClientCaching implements ApiClient {
  private tokenInfoCache: Cache<TokenInfo>;
  private receivedTransactionCache: Cache<ReceiveTransactionCostResponse>;

  constructor(private apiClient: ApiClient) {
    this.tokenInfoCache = new Cache<TokenInfo>({ defaultTtl: TWO_MINUTES_TTL });
    this.receivedTransactionCache = new Cache<ReceiveTransactionCostResponse>({ defaultTtl: _20_SECONDS_TTL });
  }

  async getTokenInfo(): Promise<TokenInfo> {
    const TOKEN_INFO_CACHE_KEY = "TOKEN_INFO_CACHE_KEY";
    const tokenInfo = this.tokenInfoCache.get(TOKEN_INFO_CACHE_KEY);
    if (tokenInfo) {
      return tokenInfo;
    }
    const fetchedTokenInfo = await this.apiClient.getTokenInfo();
    this.tokenInfoCache.put(TOKEN_INFO_CACHE_KEY, fetchedTokenInfo);
    return fetchedTokenInfo;
  }

  async getReceiveTransactionCost(args: ReceiveTransactionCostRequest): Promise<ReceiveTransactionCostResponse> {
    const RECEIVE_TX_COST_KEY = `RECEIVE_TX_COST_${args.sourceChainId}_${args.destinationChainId}_${args.messenger}`;
    const transactionCost = this.receivedTransactionCache.get(RECEIVE_TX_COST_KEY);
    if (transactionCost) {
      return transactionCost;
    }
    const fetchedTransactionCost = await this.apiClient.getReceiveTransactionCost(args);
    this.receivedTransactionCache.put(RECEIVE_TX_COST_KEY, fetchedTransactionCost);
    return fetchedTransactionCost;
  }

  async getTransferStatus(chainSymbol: ChainSymbol, txId: string): Promise<TransferStatusResponse> {
    return this.apiClient.getTransferStatus(chainSymbol, txId);
  }

  async getPoolInfoMap(pools: PoolKeyObject[] | PoolKeyObject): Promise<PoolInfoMap> {
    return this.apiClient.getPoolInfoMap(pools);
  }
}
