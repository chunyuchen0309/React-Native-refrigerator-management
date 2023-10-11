import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';


export default class TestExtend extends Component{
    constructor(props) {
        super();
        this.text=props.text;
        this.state = {
            brand: "Ford",
            model: "Mustang",
            color: "red",
            year: 1964
        };
    }
    changeColor = () => {
        this.setState({year: this.state.year+1});
        console.log(this.state.year);
    }
    render(){
        return(
            <Button 
                style={{height:60,width:100}} 
                onPress={()=>this.props.onClick(this.state.year)}
                title="測試按鈕">
            </Button>
            
        );
    }
};