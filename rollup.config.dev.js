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
    file: 'dev/index.js',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    resolveDir(),
    babel({
      exclude:'node_modules/**'
    }),
    typescript(),
    commonjs(),
    alias({
      entries: [
        {find:'@',replacement:resolve(__dirname,'src')}
      ]
    })
  ]
};