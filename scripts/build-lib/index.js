#!/usr/bin/env node
import esbuild from 'esbuild'
import { loadESBuildConfig, print } from './utils/index.js'

const buildOptions = await loadESBuildConfig()
await esbuild.build(buildOptions)
print.ok('Build complete.')
