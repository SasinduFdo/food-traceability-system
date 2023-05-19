const { Gateway, Wallets } = require('fabric-network');
const ConnectionProfile = require('../../ConnectionProfile.json');
const path = require('path');

let gateway;
let contract;

async function connectToFabric() {
  if (gateway && contract) {
    // If a connection has already been established, return the existing contract
    return contract;
  }

  try {
    const walletPath = path.join(process.cwd(), './api/blockchain/wallet/Org1');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    gateway = new Gateway();
    await gateway.connect(ConnectionProfile, {
      wallet,
      identity: 'Org1Admin',
      discovery: { enabled: true, asLocalhost: true },
    });
    const network = await gateway.getNetwork('mychannel');
    contract = await network.getContract('blockchain');
    return contract;
  } catch (e) {
    console.log(e.message);
    throw e;
  }
}

async function disconnectFromFabric() {
  if (gateway) {
    await gateway.disconnect();
    gateway = null;
    contract = null;
  }
}

module.exports = { connectToFabric, disconnectFromFabric };
