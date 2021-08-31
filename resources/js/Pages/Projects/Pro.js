import React, { Component } from 'react';
import Guest from '@/Layouts/Guest';

export default class Pro extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Guest title="Projets professionels">
                Projets professionels
            </Guest>
        )
    }

}