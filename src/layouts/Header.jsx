import React from 'react';
import Logo from './../assets/logo.gif';

export default function Header() {

    return (
        <header className={'app-header'}>
            <img src={Logo} alt="Project Logo gif"/>
            <h1>Quick Quiz App</h1>
        </header>

    );
};