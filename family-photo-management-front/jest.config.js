export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json',
        compilerOptions: {
          jsx: 'react-jsx',
        },
      },
    ],
  },
  moduleNameMapper: {
    '^shared/components$': '<rootDir>/src/shared/components/index.ts',
    '^shared/testsSetup$': '<rootDir>/src/shared/testsSetup/test-utils.tsx',
    '^shared/(.*)$': '<rootDir>/src/shared/$1',
    '^features/(.*)$': '<rootDir>/src/features/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
