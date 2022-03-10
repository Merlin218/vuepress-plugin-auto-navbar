import typescript from '@rollup/plugin-typescript';
import resolveDir from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import alias from '@rollup/plugin-alias'
import { resolve } from 'path';

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/index.js',
    format: 'cjs'
  },
  plugins: [
    resolveDir(),
    babel({
      exclude:'node_modules/**'
    }),
    typescript(),
    commonjs(),
    terser(),
    alias({
      entries: [
        {find:'@',replacement:resolve(__dirname,'src')}
      ]
    })
  ]
};