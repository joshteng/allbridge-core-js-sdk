// @ts-expect-error import tron
import * as TronWeb from "tronweb";
import * as dotenv from "dotenv";
import { getEnvVar } from "../../../utils/env";
import { AllbridgeCoreSdk, nodeUrlsDefault, RawTransaction } from "@allbridge/bridge-core-sdk";
import { ensure } from "../../../utils/utils";
dotenv.config({ path: ".env" });

const main = async () => {
  // sender address
  const accountAddress = getEnvVar("TRX_ACCOUNT_ADDRESS");
  const tokenAddress = getEnvVar("TRX_TOKEN_ADDRESS");

  // configure TronWeb
  const tronWeb = new TronWeb(
    getEnvVar("TRONWEB_PROVIDER_URL"),
    getEnvVar("TRONWEB_PROVIDER_URL"),
    getEnvVar("TRONWEB_PROVIDER_URL"),
    getEnvVar("TRX_PRIVATE_KEY")
  );

  const sdk = new AllbridgeCoreSdk(nodeUrlsDefault);
  const tokenInfo = ensure((await sdk.tokens()).find((tokenInfo) => tokenInfo.tokenAddress === tokenAddress));

  // create claim rewards raw transaction
  const rawTransactionDeposit = await sdk.pool.rawTxBuilder.claimRewards(
    {
      accountAddress: accountAddress,
      token: tokenInfo,
    },
    tronWeb
  );

  const txReceipt = await sendRawTransaction(tronWeb, rawTransactionDeposit);

  console.log("Token claim rewards:", txReceipt.txid);
};

async function sendRawTransaction(tronWeb: TronWeb, rawTransaction: RawTransaction) {
  const signedTx = await tronWeb.trx.sign(rawTransaction);

  if (!signedTx.signature) {
    throw Error("Transaction was not signed properly");
  }

  // Broadcasting the transaction
  return tronWeb.trx.sendRawTransaction(signedTx);
}

main()
  .then(() => {
    console.log("Done");
  })
  .catch((e) => {
    console.error(e);
  });
