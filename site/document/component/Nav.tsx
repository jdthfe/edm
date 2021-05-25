import React from 'react';
import { Link } from 'react-router-dom';
import { languages, getLanguage } from '../../_util/language';
import logo from '../../assets/logo2.png';
function setLanguage(event: React.ChangeEvent<HTMLSelectElement>) {
    const lang = event.currentTarget.value;
    if (lang === 'en-US') {
        localStorage.removeItem('language');
    } else {
        localStorage.setItem('language', lang);
    }
    location.reload();
}

function getHome() {
    const lang = getLanguage();
    switch (lang) {
        case 'zh-CN':
            return '首页';
        default:
            return 'Home';
    }
}
function getComponent() {
    const lang = getLanguage();
    switch (lang) {
        case 'zh-CN':
            return '组件';
        default:
            return 'Component';
    }
}
function getLanguageSet() {
    const lang = getLanguage();
    switch (lang) {
        case 'zh-CN':
            return '语言 ';
        default:
            return 'Language ';
    }
}

function isActive(str: string) {
    const href = location.href.split('/').pop();
    if (str === 'document') {
        return `document-nav-item${href === str ? ' active' : ''}`;
    } else {
        return `document-nav-item${href !== 'document' ? ' active' : ''}`;
    }
}

export default function Nav() {
    return (
        <nav className="document-nav">
            <Link replace to="/document" className="document-nav-logo">
                <img src={logo} alt="logo" />
                <p>EUI</p>
            </Link>
            <Link replace to="/document" className={isActive('document')}>
                {getHome()}
            </Link>
            <Link
                replace
                to="/document/Introduce"
                className={isActive('Introduce')}
            >
                {getComponent()}
            </Link>
            <div className="document-nav-lang">
                {getLanguageSet()}
                <select defaultValue={getLanguage()} onChange={setLanguage}>
                    {languages.map((item) => (
                        <option key={item.code} value={item.code}>
                            {item.content}
                        </option>
                    ))}
                </select>
            </div>
        </nav>
    );
}
