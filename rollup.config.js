import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
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
    babel({
      exclude: 'node_modules/**',
      presets: [ '@babel/preset-env' ],
      plugins: []
    }),
    sourcemaps(),
    commonjs(),
    cleanup(),
  ]
}
