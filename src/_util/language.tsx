// en-US must be the first item
export interface LanguageItem {
    code: Language;
    content: string;
}
export const languages: LanguageItem[] = [
    { code: 'en-US', content: 'English' },
    { code: 'zh-CN', content: '中文' },
];

/** 判断语言 */
export function getLanguage(): Language {
    const code = String(localStorage.getItem('language')) as Language;
    if (languages.map((item) => item.code).includes(code)) {
        return code;
    } else {
        return 'en-US';
    }
}
