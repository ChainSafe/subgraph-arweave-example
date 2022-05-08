FROM rust:buster as graph-node-builder

ARG COMMIT_SHA=unknown
ARG REPO_NAME=unknown
ARG BRANCH_NAME=unknown
ARG TAG_NAME=unknown

ADD . /graph-node

ENV CARGO_NET_GIT_FETCH_WITH_CLI=true

RUN apt update \
    && apt install cmake \
    && cd /graph-node \
    && rustup component add rustfmt \
    && RUSTFLAGS="-g" cargo install --locked --path node

# graph-node
FROM rust:buster
COPY --from=graph-node-builder /usr/local/cargo/bin/graph-node /usr/bin/graph-node

ENTRYPOINT [ "graph-node" ]
