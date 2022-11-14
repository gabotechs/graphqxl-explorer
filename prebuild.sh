#!/usr/bin/env sh

set -eu

if ! yum -y update &> /dev/null; then
  echo "yum is not installed, not in centos, graphqxl binary from node_modules will be used..."
  cp node_modules/node-graphqxl/graphqxl public/graphqxl
  exit 0
fi

echo "yum is available, we are in centos, let the party begin..."

curl https://sh.rustup.rs -sSf | sh
source "$HOME/.cargo/env"

yum install -y jq
VERSION=$(cat node_modules/node-graphqxl/package.json | jq .version -r)

wget "https://github.com/gabotechs/graphqxl/archive/refs/tags/v$VERSION.tar.gz"
tar -xvf "v$VERSION.tar.gz"
cd "graphqxl-$VERSION"
cargo build --release
mv target/release/graphqxl ../public/graphqxl
cd ..
rm -rf "graphqxl-$VERSION"
