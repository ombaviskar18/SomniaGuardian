#!/bin/bash

set -e
set -x
set -o pipefail

yarn Zetachain localnet start --force-kill --exit-on-error &

while [ ! -f "$HOME/.Zetachain/localnet/registry.json" ]; do sleep 1; done

forge build

GATEWAY_ETHEREUM=$(jq -r '.["11155112"].contracts[] | select(.contractType == "gateway") | .address' ~/.Zetachain/localnet/registry.json) && echo $GATEWAY_ETHEREUM
GATEWAY_ZetaCHAIN=$(jq -r '.["31337"].contracts[] | select(.contractType == "gateway") | .address' ~/.Zetachain/localnet/registry.json) && echo $GATEWAY_ZetaCHAIN
PRIVATE_KEY=$(jq -r '.private_keys[0]' ~/.Zetachain/localnet/anvil.json) && echo $PRIVATE_KEY

UNIVERSAL=$(forge create Universal \
  --rpc-url http://localhost:8545 \
  --private-key $PRIVATE_KEY \
  --evm-version paris \
  --broadcast \
  --json \
  --constructor-args $GATEWAY_ZetaCHAIN | jq -r .deployedTo) && echo $UNIVERSAL

yarn Zetachain evm call \
  --gateway "$GATEWAY_ETHEREUM" \
  --receiver "$UNIVERSAL" \
  --rpc http://localhost:8545 \
  --types string \
  --values alice \
  --yes \
  --private-key "$PRIVATE_KEY"

yarn Zetachain localnet check

yarn Zetachain localnet stop