import componentIndexNoType from './componentIndex';
import markdownOnlyNoType from './markdownOnly';
import { languages } from './language';

export interface Docs {
    readme: string;
    'readme.zh-CN'?: string;
    demoSource?: string;
    [key: string]: string | undefined;
}

export const componentIndex: ComponentIndex[] = componentIndexNoType;
export const markdownOnly: ComponentIndex[] = markdownOnlyNoType;

export const sortComponentIndex = (componentIndex: ComponentIndex[]) => {
    const newStructure: { [propName: string]: ComponentIndex[] } = {};
    componentIndex.map((item) => {
        if (newStructure[item.type]) {
            newStructure[item.type].push(item);
        } else {
            newStructure[item.type] = [item];
        }
    });
    return newStructure;
};
export const getInstance = (item: ComponentIndex) => {
    let instance: React.FC;
    try {
        if (item.type === 'markdownOnly') {
            throw 'markdownOnly have not Instance';
        } else {
            instance = require(`../../src/${item.name}/demo`).default;
        }
    } catch (e) {
        throw e;
    }
    return instance;
};
export const getDocs = (item: ComponentIndex) => {
    const docs: Docs = { readme: '' };
    try {
        if (item.type === 'markdownOnly') {
            languages.map((lang) => {
                const readmeLang = `readme${
                        lang.code === 'en-US' ? '' : '.' + lang.code
                    }`,
                    mdLang = `${item.name}${
                        lang.code === 'en-US' ? '' : '.' + lang.code
                    }`;
                docs[readmeLang] =
                    require(`!!raw-loader!../document/markdown/${mdLang}.md`).default;
            });
        } else {
            docs.demoSource =
                require(`!!raw-loader!../../src/${item.name}/demo`).default;
            languages.map((lang) => {
                const readmeLang = `readme${
                    lang.code === 'en-US' ? '' : '.' + lang.code
                }`;
                docs[readmeLang] =
                    require(`!!raw-loader!../../src/${item.name}/demo/${readmeLang}.md`).default;
            });
        }
    } catch (e) {
        throw e;
    }
    return docs;
};
