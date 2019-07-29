
const Orbs = require("orbs-client-sdk");
const { setup } = require("orbs-notary-lib");

function getClient() {
    const endpoint = process.env.ORBS_NODE_ADDRESS || "http://localhost:8080";
    const chain = Number(process.env.ORBS_VCHAIN) || 42;
    return new Orbs.Client(endpoint, chain, Orbs.NetworkType.NETWORK_TYPE_TEST_NET);
}

(async () => {
    try {
        const owner = Orbs.createAccount();
        await setup(getClient(), owner, {
            notaryContractName: "Notary",
            auditContractName: "Audit"
        });
        console.log("Success!")
    } catch(e) {
        console.log(e);
    }
})();
