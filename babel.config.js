module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    '@config': './src/config',
                    '@constants': './src/constants',
                    '@controllers': './src/controllers',
                    '@db': './src/db',
                    '@dtos': './src/dtos',
                    '@lib': './src/lib',
                    '@repositories': './src/repositories',
                    '@routes': './src/routes',
                    '@schemas': './srcschemas',
                    '@services': './src/services',
                    '@utils': './src/utils'
                }
            }
        ]
    ],
    ignore: ['**/*.spec.ts']
};
