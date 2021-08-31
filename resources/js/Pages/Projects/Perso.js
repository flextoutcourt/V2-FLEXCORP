import React, { Component } from 'react';
import Guest from '@/Layouts/Guest';

export default class Perso extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Guest title="Projets personnels">
                Projets personnels
            </Guest>
        )
    }

}