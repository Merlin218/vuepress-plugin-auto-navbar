import typescript from '@rollup/plugin-typescript';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import { resolve } from 'path';
import dts from 'rollup-plugin-dts'

const resolvePath = (...args) => resolve(...args);

export default [{
  input: 'src/index.ts',
  output: {
    file: 'lib/index.js',
    format: 'cjs'
  },
  plugins: [
    nodeResolve({
      preferBuiltins: true,
    }),
    typescript(),
    commonjs(),
    terser(),
  ]
},{
  // 生成 .d.ts 类型声明文件
  input: resolvePath('./src/types/index.d.ts'),
  output: {
    file: resolvePath('./', './lib/index.d.ts'),
    format: 'es',
  },
  plugins: [dts()],
}];
