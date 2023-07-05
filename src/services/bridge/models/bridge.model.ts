import { Big } from "big.js";
import { ChainSymbol } from "../../../chains";
import { Messenger } from "../../../client/core-api/core-api.model";
import { FeePaymentMethod } from "../../../models";
import { TokenWithChainDetails } from "../../../tokens-info";

export interface ApproveParams {
  /**
   * The token info
   */
  token: TokenWithChainDetails;

  /**
   *  The address of the token owner who is granting permission to use tokens
   */
  owner: string;

  /**
   * The integer amount of tokens to approve.
   * Optional.
   * The maximum amount by default.
   */
  amount?: string | number | Big;
}

export interface GetTokenBalanceParams {
  /**
   *  The address for which we will find out the token balance
   */
  account: string;
  token: TokenWithChainDetails;
}

/**
 * @internal
 */
export interface BaseSendParams {
  /**
   * The float amount of tokens to transfer.
   * (Includes gas fee if `gasFeePaymentMethod` is FeePaymentMethod.WITH_STABLECOIN)
   */
  amount: string;
  /**
   * The account address to transfer tokens from.
   */
  fromAccountAddress: string;
  /**
   * The account address to transfer tokens to.
   */
  toAccountAddress: string;
  messenger: Messenger;
  /**
   * The integer amount of gas fee to pay for the transfer.
   * If gasFeePaymentMethod is WITH_NATIVE_CURRENCY then
   * it is denominated in the smallest unit of the source chain currency.
   * if gasFeePaymentMethod is WITH_STABLECOIN then
   * it is denominated in the smallest unit of the source token.
   *
   * Optional.
   * If not defined, the default fee amount will be applied according to gasFeePaymentMethod.
   * See method {@link getGasFeeOptions} to get required gas fee amount.
   */
  fee?: string;

  /**
   * Payment method for the gas fee.
   *
   * WITH_NATIVE_CURRENCY - gas fee will be added to transaction as native tokens value
   * WITH_STABLECOIN - gas fee will be deducted from the transaction amount
   *
   * Optional.
   * WITH_NATIVE_CURRENCY by default.
   */
  gasFeePaymentMethod?: FeePaymentMethod;
}

export interface SendParams extends BaseSendParams {
  /**
   * {@link TokenWithChainDetails |The token info object} on the source chain.
   */
  sourceToken: TokenWithChainDetails;
  /**
   * {@link TokenWithChainDetails |The token info object} on the destination chain.
   */
  destinationToken: TokenWithChainDetails;
}

export interface GetAllowanceParams {
  token: TokenWithChainDetails;
  owner: string;
  gasFeePaymentMethod?: FeePaymentMethod;
}

export type GetAllowanceParamsDto = GetAllowanceParams;

export interface CheckAllowanceParams extends GetAllowanceParams {
  /**
   * The float amount of tokens to check the allowance.
   */
  amount: string | number | Big;
}
type AccountAddress = string | number[];

/**
 * @internal
 */
export interface TxSendParams {
  amount: string;
  contractAddress: string;
  fromChainId: number;
  fromChainSymbol: ChainSymbol;
  fromAccountAddress: string;
  fromTokenAddress: AccountAddress;
  toChainId: number;
  toAccountAddress: AccountAddress;
  toTokenAddress: AccountAddress;
  messenger: Messenger;
  fee: string;
  gasFeePaymentMethod: FeePaymentMethod;
}