#!/bin/bash

set -e # exit when error

# clean dist folder
rm -rf dist

# compile through ng-packagr
node scripts/ng-packagr.js
