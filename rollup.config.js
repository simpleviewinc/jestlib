import babel from 'rollup-plugin-babel'
import json from '@rollup/plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import sourcemaps from 'rollup-plugin-sourcemaps'
import alias from '@rollup/plugin-alias'

const shared = {
  external: ['jest', 'jsutils' ],
  watch: {
    clearScreen: false
  },
  plugins: platform => ([
    replace({
      "process.env.NODE_ENV": JSON.stringify('production'),
      "process.env.RE_PLATFORM": JSON.stringify(platform),
    }),
    resolve(),
    json(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/env', '@babel/preset-react']
    }),
    sourcemaps(),
    commonjs(),
    cleanup(),
  ])
}

export default Array
  .from([ 'web', 'native' ])
  .map((platform => ({
    ...shared,
    input: `./src/index.js`,
    output: {
      file: `./build/index.${platform}.js`,
      format: "cjs"
    },
    plugins: [
      ...shared.plugins(platform),
      alias({
        entries: {
          // Add custom overwrites here
        }
      })
    ]
  })))
