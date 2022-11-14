#!/usr/bin/env sh

set -eu

cp node_modules/node-graphqxl/graphqxl public/graphqxl

if ! yum &> /dev/null; then
  exit 0
fi

yum install libuuid-devel libmount-devel
