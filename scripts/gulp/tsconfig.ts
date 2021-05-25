'use strict';

// import fs from 'fs';
// import { getProjectUrl } from '../helpers';
// import { TsConfig } from 'gulp-typescript/release/types';
export default function() {
    // let my: TsConfig = {};
    // if (fs.existsSync(getProjectUrl('tsconfig.dts.json'))) {
    //     my = require(getProjectUrl('tsconfig.dts.json'));
    // }
    return Object.assign({
        // "compilerOptions": {
            "baseUrl": "./",
            "paths": {
                "eui": ["src/index.tsx"],
                "eui/compiled/es/*": ["src/*"]
              },
            "noUnusedParameters": true,
            "noUnusedLocals": true,
            "strictNullChecks": true,
            "target": "es6",
            "jsx": "preserve",
            "moduleResolution": "node",
            "declaration": true,
            "allowSyntheticDefaultImports": true,
            "allowJs": false,
            "lib": ["es6", "dom"],
            "keyofStringsOnly": true,
            "noImplicitAny": true,
            "esModuleInterop": true,
            "declarationDir": "./compiled/es",
            "skipLibCheck": true,
        // },
        "include": ["src"],
        // "exclude": ["node_modules", "lib", "es"]
        "exclude": ["node_modules","**/demo", "**/__tests__", "node_modules/*/**", "src/scss.tsx", "node_modules"]
    }, {
        noUnusedParameters: true,
        noUnusedLocals: true,
        strictNullChecks: true,
        target: 'es6',
        jsx: 'preserve',
        moduleResolution: 'node',
        declaration: true,
        allowSyntheticDefaultImports: true,
    });
}
