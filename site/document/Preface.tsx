import React from 'react';
import { Button } from '@jdthfe/eui';
// import Logo from './component/Logo';
import logo from '../assets/logo1.png';
import { Link } from 'react-router-dom';

function getContent() {
    const lang = localStorage.getItem('language');
    switch (lang) {
        case 'zh-CN':
            return '基于 React 的移动端组件';
        default:
            return 'React-based mobile component';
    }
}

const Preface = () => {
    return (
        <div className="preface">
            <header>
                {/* <Logo /> */}
                <img className="preface-logo" src={logo} alt="logo" />
                <p className="preface-introduce">
                    {getContent()}{' '}
                    <a href="https://github.com/jdthfe/eui/tree/master">
                        <img
                            className="preface-star"
                            src="https://img.shields.io/github/stars/jdthfe/eui.svg?style=social"
                            alt="stars"
                        />
                    </a>
                </p>
                <Link to="/document/Introduce">
                    <Button
                        style={{ color: '#b73132' }}
                        className="preface-btn"
                        inline
                    >
                        document
                    </Button>
                </Link>
                <Link to="/instance">
                    <Button
                        style={{ color: '#b73132' }}
                        ghost
                        className="preface-btn"
                        inline
                    >
                        instance
                    </Button>
                </Link>
            </header>
        </div>
    );
};

export default Preface;
