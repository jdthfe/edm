import React from 'react';
import imgUrl from '../../assets/instanceBar.png';
interface IframeProps {
    src: string;
    className: string;
    offsetTop: number;
}
const Iframe = (props: IframeProps) => {
    const { src = '#/instance', className, offsetTop } = props;
    const iframe = (
        // 增加 key，可以实现在 document 页面中，后退时整体后退
        // <div key={src} className={`document-iframe ${className}`}>
        <div
            className={`document-iframe ${className}`}
            style={{ marginTop: offsetTop }}
        >
            <div className="document-iframe-header">
                <img src={imgUrl} alt="instanceTop" />
                <input
                    type="text"
                    readOnly
                    disabled
                    value={`${location.href.replace('document', 'instance')}`}
                />
            </div>
            <iframe className="document-iframe-main" src={src} id="iframe" />
            {/* <iframe id="iframe" width="375" height="750" /> */}
        </div>
    );
    return iframe;
};

export default Iframe;
