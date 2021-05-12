import React from 'react'
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css'
const checkoutSummary =(props)=>{
return (
    <div className={classes.CheckoutSummary}>
        <h1>we hopes it taste well</h1>
        <div style={{width:'100%',margin:'auto' }}>
        <Burger ingredient={props.ingredients} />
    </div>
        <Button 
            btnType="Danger" 
            clicked={props.CheckoutCancelled}>CANCEL</Button>
        <Button 
            btnType="Success" 
            clicked={props.CheckoutContinued}>CONTINUE</Button>
    </div>
)
}

export default checkoutSummary;