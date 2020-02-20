module.exports = {
  rootDir: process.cwd(),
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ['<rootDir>/scripts/jest/setupTests.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/examples/',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/dist'
  ],
  transform: {
    '^.+\\.(ts|html)$': 'ts-jest',
    '^.+\\.js$': 'babel-jest'
  },
  "transformIgnorePatterns": [
    "node_modules/(?!@clinia).+\\.js$"
  ],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/src/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [
        'jest-preset-angular/build/InlineFilesTransformer',
        'jest-preset-angular/build/StripStylesTransformer'
      ]
    }
  }
}
