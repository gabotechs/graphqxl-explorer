#!/usr/bin/env sh

set -eu

cp node_modules/node-graphqxl/graphqxl public/graphqxl

if ! yum -y update &> /dev/null; then
  echo "yum is not installed, omitting..."
  exit 0
fi

  echo "yum is available, installing dependencies..."
yum install glibc libuuid-devel libmount-devel
