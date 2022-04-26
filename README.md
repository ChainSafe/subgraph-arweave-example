# Subgraph Arweave Example

## Setup

0. Get submodules

```
git submodule update --init
```

1. Run ingester

```
./.modules/firehose-arweave/devel/standard/start.sh
```

2. Prepare the environment of `graph-node`

```
yarn up
```

3. Run graph-node

```
cargo b --manifest-path .modules/graph-node/node/Cargo.toml --release
./.modules/graph-node/target/release/graph-node --config .maintain/config.toml --ipfs http://0.0.0.0:5001
```

## Build

```
yarn
yarn codegen
yarn build
```

## Create subgraph

```
yarn create-local
```

### Deploy subgraph

```
yarn deploy-local
```
