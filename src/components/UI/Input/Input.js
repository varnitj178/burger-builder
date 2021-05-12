import React from 'react'
import classes from './Input.css'
const input =(props)=>{
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    let validationError = null;
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
        validationError= <p className={classes.ValidationError} >Please enter a valid {props.valueType}!</p>
    }
    switch(props.inputtype){
        case('input'):
            inputElement=<input 
                onChange={props.changed}
                className={inputClasses.join(' ')} 
                {...props.elementConfig}  value={props.value}/>
            break;
        case('textarea'):
            inputElement=<textarea 
            onChange={props.changed}
                {...props.elementConfig} 
                value={props.value}/>
            break;
            case ( 'select' ):
                inputElement = (
                    <select>
                        <option>a</option>
                        <option>b</option>
                    </select>
                );
                break;
        default:
            inputElement= <input 
            onChange={props.changed}
                {...props.elementConfig} 
                className={inputClasses.join(' ')} value={props.value}/>
    }
    return (
        <div className={classes.Input}>
            <label>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
    

}


export default input