import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import sourcemaps from 'rollup-plugin-sourcemaps'

export default {
  input: `./src/index.js`,
  output: {
    file: `./build/index.js`,
    format: 'cjs'
  },
  external: ['jest', 'jsutils', 'jsvalidator' ],
  watch: {
    clearScreen: false
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    resolve(),
    babel({
      exclude: 'node_modules/**',
      presets: [ '@babel/preset-env' ],
      plugins: [ [ '@babel/plugin-transform-runtime', { regenerator: true } ] ]
    }),
    sourcemaps(),
    commonjs(),
    cleanup(),
  ]
}
