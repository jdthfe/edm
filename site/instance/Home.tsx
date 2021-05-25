import React, { Fragment } from 'react';
import { Button, WhiteSpace, WingBlank } from '@jdthfe/eui';
import { Link } from 'react-router-dom';

interface HomeProps {
    structure: { [propName: string]: ComponentIndex[] };
}

const Home = (props: HomeProps) => {
    const { structure } = props;
    return (
        <WingBlank className="instance-home">
            {Object.keys(structure).map((key) => (
                <Fragment key={key}>
                    <p>{key}</p>
                    {structure[key].map((item) => (
                        <Link to={`/instance/${item.name}`} key={item.name}>
                            <Button ghost>{item.name}</Button>
                            <WhiteSpace />
                        </Link>
                    ))}
                </Fragment>
            ))}
        </WingBlank>
    );
};
export default Home;
