#!/bin/bash

# Create necessary directories
mkdir -p src

# Download the OpenAPI specification
# curl -f -o scripts/openapi.yml https://docs.buffett-code.com/assets/openapi.yml

# Generate TypeScript types from OpenAPI spec
# npx openapi-typescript scripts/openapi.yml -o src/client/api.ts

npx openapi-typescript https://docs.buffett-code.com/assets/openapi.yml -o src/client/api.ts