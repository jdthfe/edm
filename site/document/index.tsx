import React, { useEffect, useState } from 'react';
import { componentIndex, markdownOnly, sortComponentIndex } from '../_util';
import { Route, RouteComponentProps } from 'react-router-dom';

import Nav from './component/Nav';
import Article from './Article';
import Aside from './component/Aside';
import Iframe from './component/Iframe';
import Footer from './component/Footer';

import Preface from './Preface';

const Document: React.FC<RouteComponentProps> = (props) => {
    const { match, location } = props;
    const [preOffsetTop, setPreOffsetTop] = useState<number>(0);
    /**
     * 添加纯文本页面
     * @type 类型必须为 markdownOnly
     * @name 请创建 [name].md 在对应文件夹中 site\document\markdown
     */
    const disableIframe = `|${Object.values(markdownOnly)
        .map((item) => item.name.toLocaleLowerCase())
        .join('|')}|`;
    const newDirectoryStructure = markdownOnly.concat(componentIndex);
    function isMarkdownOnly(markdownOnly: ComponentIndex[]) {
        const name = location.pathname.split('/').pop();
        return markdownOnly.find((item) => item.name === name);
    }

    function onClick(key: string) {
        console.log(key);
    }
    let src = `#${location.pathname.replace('document', 'instance')}`;

    useEffect(() => {
        const tPre =
            document.querySelector<HTMLPreElement>('.markdown-body pre');
        if (!tPre) {
            return;
        }
        setPreOffsetTop(tPre.offsetTop);
        return;
    }, [src]);

    return (
        <div className="document">
            <Nav />
            {match.isExact ? (
                <Preface />
            ) : (
                <main className="document-main">
                    <Aside
                        structure={sortComponentIndex(newDirectoryStructure)}
                        onClick={onClick}
                    />
                    {newDirectoryStructure.map((item) => (
                        <Route
                            key={item.name}
                            path={`/document/${item.name}`}
                            component={() => <Article item={item} />}
                        />
                    ))}

                    {disableIframe.includes(
                        `|${(src.split('/').pop() || '').toLocaleLowerCase()}|`,
                    ) ? null : (
                        <Iframe
                            offsetTop={preOffsetTop || 0}
                            className={
                                isMarkdownOnly(markdownOnly) ? 'hide' : ''
                            }
                            src={src}
                        />
                    )}
                </main>
            )}
            <Footer />
        </div>
    );
};

export default Document;
