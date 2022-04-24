# Subgraph Arweave Example

## Setup

0. Get submodules

```
git submodule update --init
```

1. Run ingester

```
./devel/standard/start.sh
```

2. prepare the environment for `graph-node`

```
yarn up
```

3. run graph-node

```
cargo b --manifest-path .modules/graph-node/node/Cargo.toml --release
./target/release/graph-node -c .maintain/config.toml --ipfs http://0.0.0.0:5001
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
