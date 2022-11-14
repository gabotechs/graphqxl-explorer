#!/usr/bin/env sh

set -eu

cp node_modules/node-graphqxl/graphqxl public/graphqxl

if ! yum &> /dev/null; then
  echo "yum is not installed, omitting..."
  exit 0
fi

  echo "yum is available, installing dependencies..."
yum install libuuid-devel libmount-devel
