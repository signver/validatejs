#!/usr/bin/env node

import { loadESBuildConfig } from './utils/index.js'

const build = await loadESBuildConfig()
console.log(build)