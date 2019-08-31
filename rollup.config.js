import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'esm',
    },
  ],
  plugins: [
    resolve({
      mainFields: ['module', 'main'],
    }),
    typescript({
      typescript: require('typescript'),
    }),
  ],
}
