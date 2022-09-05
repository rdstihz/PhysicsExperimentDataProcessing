#! /bin/bash

JS_PATH=DataProcessing/static/DataProcessing/js/
JS_PATH_DIST=${JS_PATH}
JS_PATH_SRC=${JS_PATH}src/

find $JS_PATH_SRC -type f -name '*.js' | sort | xargs cat > ${JS_PATH_DIST}dist.js
