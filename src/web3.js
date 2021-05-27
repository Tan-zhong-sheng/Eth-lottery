import Web3 from 'web3';
let web3Provider;
if (window.ethereum) {
    web3Provider = window.ethereum;
    try {
        window.ethereum.enable();
    } catch (error) {
        console.error("User denied account access")
    }
}
else if (window.web3) {
    web3Provider = window.web3.currentProvider;
}
else {
    web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
const web3 = new Web3(web3Provider);
//const web3 = new Web3(window.web3.currentProvider);//MetaMask自带的web3window.web3.currentProvider
export default web3;//     ES6模块主要有两个功能：export和import
//                         export用于对外输出本模块（一个文件可以理解为一个模块）变量的接口
//                         import用于在一个模块中加载另一个含有export接口的模块。
//                         也就是说使用export命令定义了模块的对外接口以后，其他JS文件就可以通过import命令加载这个模块（文件）。这几个都是ES6的语法。