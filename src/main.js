import App from "./App.svelte";
import { Notary, Audit, sha256 } from "orbs-notary-lib";
import {
  createAccount,
  Client,
  encodeHex,
  decodeHex
} from "orbs-client-sdk";

const SENDER_PUBLIC_KEY = "sender_public_key";
const SENDER_PRIVATE_KEY = "sender_private_key";
const SENDER_ADDRESS = "sender_address";

if (!localStorage.getItem(SENDER_PUBLIC_KEY)) {
  const sender = createAccount();
  localStorage.setItem(SENDER_PUBLIC_KEY, encodeHex(sender.publicKey));
  localStorage.setItem(SENDER_PRIVATE_KEY, encodeHex(sender.privateKey));
  localStorage.setItem(SENDER_ADDRESS, sender.address);
}

const publicKey = decodeHex(localStorage.getItem(SENDER_PUBLIC_KEY));
const privateKey = decodeHex(localStorage.getItem(SENDER_PRIVATE_KEY));
const address = localStorage.getItem(SENDER_ADDRESS);
const orbsClient = new Client(
  process.env.ORBS_NODE_ADDRESS,
  process.env.ORBS_VCHAIN,
  "TEST_NET"
);

const NOTARY_CONTRACT_NAME = process.env.ORBS_NOTARY_CONTRACT || "Notary";
const AUDIT_CONTRACT_NAME = process.env.ORBS_AUDIT_CONTRACT || "Audit";
console.log(NOTARY_CONTRACT_NAME, AUDIT_CONTRACT_NAME)
const actions = new Notary(orbsClient, NOTARY_CONTRACT_NAME, publicKey, privateKey, true);
const audit = new Audit(orbsClient, AUDIT_CONTRACT_NAME, publicKey, privateKey);

const app = new App({
  target: document.body,
  props: {
    actions,
    audit,
    sha256,
    privateKey: encodeHex(privateKey),
    address,
  }
});

export default app;
