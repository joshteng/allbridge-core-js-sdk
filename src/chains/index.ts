import { BasicChainProperties } from "./models";

export * from "./models";

export enum ChainSymbol {
  /**
   * The Goerli testnet.
   */
  GRL = "GRL",

  /**
   * The Sepolia testnet.
   */
  SPL = "SPL",

  /**
   * The BNB Smart Chain main network.
   */
  BSC = "BSC",

  /**
   * The Ethereum main network.
   */
  ETH = "ETH",

  /**
   * The Solana network.
   */
  SOL = "SOL",

  /**
   * The TRON network.
   */
  TRX = "TRX",

  /**
   * The Polygon network.
   */
  POL = "POL",

  /**
   * The Polygon Mumbai testnet.
   */
  MUM = "MUM",

  /**
   * The Arbitrum network.
   */
  ARB = "ARB",
}

export enum ChainType {
  EVM = "EVM",
  SOLANA = "SOLANA",
  TRX = "TRX",
}

/**
 * Native gas tokens decimals by ChainType
 */
export const ChainDecimalsByType: Record<ChainType, number> = {
  EVM: 18,
  SOLANA: 9,
  TRX: 6,
};

export const chainProperties: Record<string, BasicChainProperties> = {
  [ChainSymbol.GRL]: {
    chainSymbol: ChainSymbol.GRL,
    chainId: "0x5",
    name: "Goerli",
    chainType: ChainType.EVM,
  },
  [ChainSymbol.SPL]: {
    chainSymbol: ChainSymbol.SPL,
    chainId: "0xaa36a7",
    name: "Sepolia",
    chainType: ChainType.EVM,
  },
  [ChainSymbol.BSC]: {
    chainSymbol: ChainSymbol.BSC,
    chainId: "0x38",
    name: "BNB Chain",
    chainType: ChainType.EVM,
  },
  [ChainSymbol.ETH]: {
    chainSymbol: ChainSymbol.ETH,
    chainId: "0x1",
    name: "Ethereum",
    chainType: ChainType.EVM,
  },
  [ChainSymbol.ARB]: {
    chainSymbol: ChainSymbol.ARB,
    chainId: "0xa4b1",
    name: "Arbitrum",
    chainType: ChainType.EVM,
  },
  [ChainSymbol.POL]: {
    chainSymbol: ChainSymbol.POL,
    chainId: "0x89",
    name: "Polygon",
    chainType: ChainType.EVM,
  },
  [ChainSymbol.MUM]: {
    chainSymbol: ChainSymbol.MUM,
    chainId: "0x13881",
    name: "Mumbai",
    chainType: ChainType.EVM,
  },
  [ChainSymbol.SOL]: {
    chainSymbol: ChainSymbol.SOL,
    name: "Solana",
    chainType: ChainType.SOLANA,
  },
  [ChainSymbol.TRX]: {
    chainSymbol: ChainSymbol.TRX,
    name: "Tron",
    chainType: ChainType.TRX,
  },
};
