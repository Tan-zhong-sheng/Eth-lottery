//部署网络到真实网络
const Web3=require('web3');
const {interface,bytecode}=require('./compile');
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "pact train ring before earth twenty audit release blast blood electric gift"; // 12 word mnemonic
const provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/e69a4204623142cfad7b43905d873dd0");
const web3=new Web3(provider);
delop=async()=>{
    const account= await web3.eth.getAccounts();
    const result=await new web3.eth.Contract(JSON.parse(interface)).deploy({data:bytecode}).send({
        from:account[0],
        gas:1000000
    });
    console.log(result.options.address);
    console.log('-------------------');
    console.log(interface);
}
delop();