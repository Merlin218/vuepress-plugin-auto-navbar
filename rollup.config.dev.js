import typescript from '@rollup/plugin-typescript';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'
import { resolve } from 'path';
import dts from 'rollup-plugin-dts'

const resolvePath = (...args) => resolve(...args);

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dev/index.js',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [
      nodeResolve({
        preferBuiltins:true
      }),
      typescript(),
      commonjs(),
    ]
  },
  {
   // 生成 .d.ts 类型声明文件
   input: resolvePath('./src/types/index.d.ts'),
   output: {
     file: resolvePath('./', './dev/index.d.ts'),
     format: 'cjs',
   },
   plugins: [dts()],
 },
];
