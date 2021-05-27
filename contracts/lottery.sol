pragma solidity ^0.4.17;

contract lottery{
    address public manager;
    address[] public player;
    address public winer;
    uint256 public round;
    function lottery() public{
        manager=msg.sender;
    }
    function getmanager() public view returns(address){
        return manager;
    }
    function enter() public payable{
        require(msg.value==1 ether);
        player.push(msg.sender);
    }
    function getallplayer() public view returns(address[]){
        return player;
    }
    function getbalance() public view returns(uint){
        return this.balance;
    }
    function getplayercount() public view returns(uint){
        return player.length;
    }
    function random() private view returns(uint){
        return uint(keccak256(block.difficulty,now,player));
    }
    function pickWiner() public controlmanger isempty{
        uint index =random()%getplayercount();
        winer=player[index];
        winer.transfer(this.balance);
        round++;
        delete(player);
    }
    function getwiner() public view returns(address){
        return winer;
    }
    function refound() public controlmanger isempty{
        for(uint i=0;i<getplayercount();i++){
            player[i].transfer(1 ether);
        }
        delete(player);
    }
    //统一写，修饰器
    modifier controlmanger(){
        require(msg.sender==manager);
        _;
    }
    modifier isempty(){
        require(getplayercount()>0);
        _;
    }
}