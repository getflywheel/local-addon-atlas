#!/bin/bash

# Decompress
gzip -d getflywheel-local-addon-headless-*.tgz
# Add npm-bundled directory
gtar -rf getflywheel-local-addon-headless-*.tar package/npm-bundled/
# Re-compress
echo "Re-compressing package"
gzip getflywheel-local-addon-headless-*.tar
# Rename .tar.gz to .tgz
find . -type f -name '*.tar.gz' -exec sh -c 'x="{}"; mv "$x" "${x%.tar.gz}.tgz"' \;
