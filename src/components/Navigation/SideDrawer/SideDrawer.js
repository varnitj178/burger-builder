import React from 'react'
import Aux from '../../../hoc/Auxilliary'
import Logo from '../../Logo/Logo'
import Backdrop from '../../UI/Backdrop/Backdrop'
//import Modal from '../../UI/Modal/Modal'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'


const sideDrawer =(props)=>{
    let attachedClasses=[classes.SideDrawer,classes.Close]

    if(props.open){
        attachedClasses= [classes.SideDrawer,classes.Open]
    }
    return(
        <Aux>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
            <div className ={classes.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </Aux>
    );
}


export default sideDrawer;