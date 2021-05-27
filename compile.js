const path=require('path');
const fs=require('fs');
const solc=require('solc');
const srcpath=path.resolve(__dirname,'contracts','lottery.sol');//路径
const source=fs.readFileSync(srcpath,'utf-8');//源代码内容
const result=solc.compile(source,1);
//console.log(result)
module.exports=result.contracts[':lottery']//取出json值
