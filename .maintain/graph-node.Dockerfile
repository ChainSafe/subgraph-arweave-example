FROM rust:buster as graph-node-build

ARG COMMIT_SHA=unknown
ARG REPO_NAME=unknown
ARG BRANCH_NAME=unknown
ARG TAG_NAME=unknown

ADD . /graph-node

RUN cd /graph-node \
    && rustup component add rustfmt \
    && RUSTFLAGS="-g" cargo install --locked --path node \
    && cargo clean

ENTRYPOINT [ "graph-node" ]
