import * as React from 'react';
import Router from 'next/router';

interface IModalProps{
    onclick:any
    children?:any
    title:string
}

export class Modal extends React.Component<IModalProps> { 
    
    styles;
    constructor(props) { 
        super(props) 
    }
            
    render (){     
        const {onclick} = this.props;
        return ( 
        <div className="message" > <samp> {this.props.title} </samp> {this.props.children} 
            {this.props.children}   
            <button className='default'  onClick={()=> onclick(false)} >ok</button>
        </div>)
    }

}

