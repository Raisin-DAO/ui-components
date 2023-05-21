import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [json(), typescript({ tsconfig: './tsconfig.json' })],
};
