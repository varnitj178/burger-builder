import React, { Component } from 'react'
import Aux from '../../../hoc/Auxilliary';
import Button from '../../UI/Button/Button';
 

class OrderSummary extends Component{

    UNSAFE_componentWillUpdate(){
        console.log('[OrderSummary] WillUpdate');
    }
    

    render(){
        const ingredientSummary = Object.keys(this.props.ingredient)
        .map(igKey=>{
            return (
            <li key={igKey}>
                <span style={{textTransform:'capitalize'}}>{igKey}</span>:
                {this.props.ingredient[igKey]}
            </li>)
        })
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>a Delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
} 


export default OrderSummary;