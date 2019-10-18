import React from 'react';
import { NavBar } from './NavBar';

const headerBackgroundImageUrl = './image/header-background.jpeg';

export class Header extends React.Component {

    render() {
        return (
            <React.Fragment>
                <div style={{ height:'720px', backgroundImage: 'url(' + headerBackgroundImageUrl + ')', backgroundSize: 'cover', opacity: '0.9', lineHeight: '700px'}}> 
                        <h1 style={{color:'#FFF7F6',textAlign:'center', lineHeight:'700px', height:'700px', fontSize:'200px'}}>SMG LIFE</h1>
                </div>
                <NavBar />
            </React.Fragment>
        );
    }
}