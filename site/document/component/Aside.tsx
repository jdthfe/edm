import React, { Fragment } from 'react';
import { Button } from '@jdthfe/eui';
import { Link } from 'react-router-dom';
import { getLanguage } from '../../_util/language';
interface AsideProps {
    structure: { [propName: string]: ComponentIndex[] };
    onClick: (key: string) => void;
}

function isActive(str: string) {
    const href = location.href.split('/').pop();
    return href === str;
}

const Aside = (props: AsideProps) => {
    const { structure, onClick } = props;

    return (
        <div className="document-aside">
            {Object.keys(structure).map((key) => (
                <Fragment key={key}>
                    <p className="document-aside-type">{key}</p>
                    {structure[key].map((item) => (
                        <Link
                            to={`/document/${item.name}`}
                            replace
                            key={item.name}
                        >
                            <Button
                                // theme="primary"
                                style={
                                    isActive(item.name)
                                        ? { color: '#b73132' }
                                        : { color: '#333' }
                                }
                                ghost
                                rectangle
                                className="document-aside-btn"
                                onClick={() => onClick(item.name)}
                            >
                                {item.name}{' '}
                                {getLanguage() !== 'en-US'
                                    ? item[getLanguage() as keyof LanguageObj]
                                    : ''}
                            </Button>
                        </Link>
                    ))}
                </Fragment>
            ))}
        </div>
    );
};
export default Aside;
