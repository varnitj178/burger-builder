import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
//import axios from '../../axios-orders'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7

}

class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state ={...}
    // }
    state={
        ingredient:null,
        totalPrice: 4,
        pruchasable:false,
        purchasing : false,
        loading:false,
        error:false
    }

    componentDidMount(){
        console.log(this.props);
        axios.get('https://burger-4dc59-default-rtdb.firebaseio.com/ingredients.json')
            .then(res=>{
                this.setState({ingredient:res.data})
            })
            .catch(err=>{
                this.setState({error:true})
            })
    }
    updatePurchaseState(ingredient){
        // const ingredient={
        //     ...this.state.ingredient
        // }
        const sum = Object.keys(ingredient)
            .map(igKey=>{
                return ingredient[igKey]
            })
            .reduce((sum,el)=>{
                return sum+el;
            },0)
        this.setState({pruchasable:sum>0});
    }


    addIngredientHandler = (type)=>{
        const oldCount = this.state.ingredient[type];
        const updatedCount= oldCount+1;
        const updatedingredients ={
            ...this.state.ingredient
        };
        updatedingredients[type] =updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice+priceAddition;
        this.setState({totalPrice:newPrice,ingredient:updatedingredients})
        this.updatePurchaseState(updatedingredients)
        
    }

    removeIngredientHandler =(type) =>{
        const oldCount = this.state.ingredient[type];
        if(oldCount<=0){
            return ;
        }
        const updatedCount=oldCount-1;
        const updatedingredients={
            ...this.state.ingredient
        };
        updatedingredients[type]=updatedCount;
        const PriceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newprice =oldPrice-PriceDeduction;
        this.setState({totalPrice:newprice,ingredient:updatedingredients})
        this.updatePurchaseState(updatedingredients);


    }
    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }
    
    purchaseContinueHandler =()=>{
        //alert('you continue')
        
        const queryParam =[];
        for(let i in this.state.ingredient){
            queryParam.push(encodeURIComponent(i)+ '='+ encodeURIComponent(this.state.ingredient[i]));
        }
        queryParam.push('price=' + this.state.totalPrice)
        const queryString= queryParam.join('&')
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+ queryString
        })
    }
    render(){
        const disabledInfo={
            ...this.state.ingredient
        }
        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key] <= 0
        }
        let orderSummary = null;

        
        // if(this.state.loading){
        //     orderSummary= <Spinner/>
        // }
        let burger = this.state.error? <p style={{textAlign:'center'}}>Ingredients can't be loaded</p>:<Spinner/>
        if(this.state.ingredient){
             burger =(
                <Aux>
                    <Burger ingredient={this.state.ingredient}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved= {this.removeIngredientHandler}
                        disabled ={disabledInfo}
                        pruchasable={this.state.pruchasable}
                        ordered= {this.purchaseHandler}
                        price={this.state.totalPrice}/>
                </Aux>
            )
            orderSummary = <OrderSummary 
            price={this.state.totalPrice}
            purchaseCanceled ={this.purchaseCancelHandler}
            purchaseContinued = {this.purchaseContinueHandler}
            ingredient={this.state.ingredient}/> 
        }
        if(this.state.loading){
            orderSummary= <Spinner/>
        }
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}


export default withErrorHandler( BurgerBuilder,axios);
