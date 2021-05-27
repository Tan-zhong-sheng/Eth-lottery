import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import {Message, Container, Card, Image, Icon, Statistic, Button, Label} from 'semantic-ui-react';
import web3 from './web3';
import lottery from "./lottery";

class App extends Component {

    state = {
        manager: '',
        playerCount:0,
        balance:0,
        loading:false,
        showButton:'none'
    }


    async componentDidMount() {
        const manager = await lottery.methods.getmanager().call();
        this.setState({manager: manager});
        const playercount = await lottery.methods.getplayercount().call();
        this.setState({playerCount: playercount});
        let balance = await lottery.methods.getbalance().call();
        balance=web3.utils.fromWei(balance,"ether");
        this.setState({balance: balance});
        const account = await web3.eth.getAccounts();
        if(account[0]!=manager){
            this.setState({showButton: 'none'});
        }else{
            this.setState({showButton: 'inline'});
        }
    }
    enter=async ()=>{

        this.setState({loading: true});
        const account= await web3.eth.getAccounts();
        await lottery.methods.enter().send({
           from:account[0],
           value:'1000000000000000000'
        });
        this.setState({loading: false});
    };
    pickWiner=async ()=>{
        this.setState({loading: true});
        const account= await web3.eth.getAccounts();
        await lottery.methods.pickWiner().send({
            from:account[0]
        });
        this.setState({loading: false});
    };
    reround=async ()=>{
        this.setState({loading: true});
        const account= await web3.eth.getAccounts();
        await lottery.methods.refound().send({
            from:account[0]
        });
        this.setState({loading: false});
    };

    render() {
        return (
            <Container>
                <br/>
                <Message info>
                    <Message.Header>智能合约彩票</Message.Header>
                    <p>越买越发财</p>
                </Message>
                <Card.Group>
                    <Card>
                        <Image src='/images/lottery.jpg' wrapped ui={false}/>
                        <Card.Content>
                            <Card.Header>六合彩</Card.Header>
                            <Card.Meta>
                                <p>管理员地址</p>
                                <Label size='mini'>
                                    {this.state.manager}
                                </Label>
                            </Card.Meta>
                            <Card.Description>
                                每天晚上8点准时开奖
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user'/>
                                {this.state.playerCount}
                            </a>
                        </Card.Content>
                        <Card.Content extra>
                            <Statistic color='teal' inverted>
                                <Statistic.Value>{this.state.balance} ether</Statistic.Value>
                            </Statistic>
                        </Card.Content>
                        <Button animated='fade' onClick={this.enter} loading={this.state.loading} disabled={this.state.loading}>
                            <Button.Content visible>投注</Button.Content>
                            <Button.Content hidden>购买天天中大奖</Button.Content>
                        </Button>
                        <Button color={"yellow"} onClick={this.pickWiner} loading={this.state.loading} style={{display:this.state.showButton} }>开奖</Button>
                        <Button color={"yellow"} onClick={this.reround} loading={this.state.loading} style={{display:this.state.showButton} }>退钱</Button>
                    </Card>
                </Card.Group>
            </Container>
        )
    }
}

export default App;
