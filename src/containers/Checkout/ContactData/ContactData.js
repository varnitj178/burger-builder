//import axios from 'axios'
import React, { Component } from 'react'
import axios from '../../../axios-orders'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'


class ContactData extends Component{
    state={
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation:{
                    required:true,
                    minLength:6,
                    maxLength:6
                },
                valid:false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            }
            
        },
        loading: false
    }

    orderHandler=(event)=>{
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading:true})
        const formData={};
        for(let formElementIndentifier in this.state.orderForm){
            formData[formElementIndentifier]= this.state.orderForm[formElementIndentifier].value;
        }
        const order={
            ingredient:this.props.ingredients,
            price:this.props.price,
            orderData: formData
           
        }
        axios.post('/orders.json',order)
            .then(response=>{
                this.setState({loading:false});
                this.props.history.push('/')
            })
            .catch(err=>{
                this.setState({loading:false})
            })
    }

    checkValidity=(value,rules)=>{
        let isValid= false;
        if(rules.required){
            isValid= value.trim()!=='';
        }
        if(rules.minLength){
            isValid = value.length>= rules.minLength
        }
        if(rules.maxLength){
            isValid = value.length<= rules.minLength
        }
        return isValid
    }

    inputChangedHandler=(event,inputIdentifier)=>{
        //console.log(event.target.value);
        const updatedOrderForm ={
            ...this.state.orderForm
        }
        const updatedFormElement={
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched=true
        updatedOrderForm[inputIdentifier]= updatedFormElement
        console.log(updatedFormElement);
        this.setState({orderForm:updatedOrderForm})

    }
    render(){
        const formElementsArray =[]
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = ( 
        
            <form onSubmit={this.orderHandler} >
               {formElementsArray.map(formElement=>(
                   <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    shouldValidate={formElement.config.validation}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    changed={(event,)=>this.inputChangedHandler(event,formElement.id)} />
               ))}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if(this.state.loading){
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>
                    Enter your Contact data
                </h4>
               {form}
            </div>

        )
    }
}


export default ContactData;