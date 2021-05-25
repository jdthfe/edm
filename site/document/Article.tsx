import React from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism';
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/styles/prism';

import { getDocs } from '../_util';
import { getLanguage } from '../_util/language';

interface ContainerProps {
    item: ComponentIndex;
}

const codeReg = new RegExp(/```[jt]sx(.|\n)+?```/);
function getRenderContent(str: string = '', k: number = 0): JSX.Element[] {
    const codeMatched = str.match(codeReg);
    if (codeMatched) {
        const code = codeMatched[0],
            [pre, after] = str.split(code);
        const codeDom = pre.includes('## Demo') ? (
            <div key={k + 1} className="markdown-body-code">
                <SyntaxHighlighter
                    style={base16AteliersulphurpoolLight}
                    language="jsx"
                >
                    {code.replace(/(^```[jt]sx\s*|```$)/g, '')}）
                </SyntaxHighlighter>
            </div>
        ) : (
            <SyntaxHighlighter
                key={k + 1}
                style={base16AteliersulphurpoolLight}
                language="jsx"
            >
                {code.replace(/(^```[jt]sx\s*|```$)/g, '')}
            </SyntaxHighlighter>
        );
        return [
            <ReactMarkdown key={k} source={pre} />,
            codeDom,
            ...getRenderContent(after, k + 2),
        ];
    } else {
        return [<ReactMarkdown key={k} source={str} />];
    }
}

const Article = (props: ContainerProps) => {
    const { item } = props,
        docs = getDocs(item),
        { demoSource } = docs,
        lang = getLanguage(),
        readme = docs[`readme${lang !== 'en-US' ? '.' + lang : ''}`] || '';
    const str = `# ${item.name} ${
        lang !== 'en-US' ? item[lang] : ''
    }\n${readme.replace(
        '## Demo',
        `## Demo\n\`\`\`jsx\n${demoSource}\n\`\`\``.replace(
            '@src/index',
            '@jdthfe/eui',
        ),
    )}`;
    return (
        <article className="document-article">
            <div className="markdown-body">{getRenderContent(str)}</div>
        </article>
    );
};

export default Article;
