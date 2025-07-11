import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import replace from '@rollup/plugin-replace'
import { rollup } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import { createRequire } from 'module'
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { babel } from '@rollup/plugin-babel';
const require = createRequire(import.meta.url)
const packageConfig = require('./package.json')

export default async () => {
  const webworkerContent = await buildWebWorker()

  const commonPlugins = [
    resolve(),
    replace({
      preventAssignment: true,
      values: {
        TRACKER_VERSION: packageConfig.version,
        'global.WEBWORKER_BODY': JSON.stringify(webworkerContent),
      },
    }),
  ]

  const entryPoints = ['build/main/index.js', 'build/main/entry.js']

  const esmBuilds = entryPoints.map((input) => ({
    input,
    output: {
      dir: 'dist/lib',
      format: 'es',
      sourcemap: true,
      entryFileNames: '[name].js',
    },
    plugins: [...commonPlugins],
  }))

  const cjsBuilds = entryPoints.map((input) => ({
    input,
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      sourcemap: true,
      entryFileNames: '[name].js',
    },
    plugins: [...commonPlugins, commonjs()],
  }))


  const iifeBuild = {
    input: 'src/evilreplay.js',
    context: 'window',
    output: {
      dir: 'dist/iife',
      format: 'iife',
      sourcemap: false,
    },
    plugins: [replace({
      preventAssignment: true,
        values: {
          TRACKER_VERSION: packageConfig.version,
          'global.WEBWORKER_BODY': JSON.stringify(webworkerContent),
        },
      }),
      babel({
        babelHelpers: 'bundled',
        presets: [
          '@babel/preset-env',
        ],
        exclude: '/node_modules/**' //\/(error-stack-parser|stackframe)/
      }), resolve({ browser: true }), 
      commonjs({
        include: /node_modules/, //\/(error-stack-parser|stackframe)/
      }), nodePolyfills()
    ],
  }

  return [...esmBuilds, ...cjsBuilds, iifeBuild]
}

async function buildWebWorker() {
  console.log('building wworker')
  const bundle = await rollup({
    input: 'src/webworker/index.ts',
    plugins: [
      resolve(),
      typescript({
        tsconfig: 'src/webworker/tsconfig.json',
      }),
      // terser(),
    ],
  })

  const { output } = await bundle.generate({
    format: 'iife',
    name: 'WebWorker',
    inlineDynamicImports: true,
  })
  const webWorkerCode = output[0].code

  console.log('webworker done!', output.length)

  return webWorkerCode
}
