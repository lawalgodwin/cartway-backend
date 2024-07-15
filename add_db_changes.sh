#!/usr/bin/env bash

# This script generates migrations for any change in database schema
# This is similar to the concept of  "git add" command

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 migration_name"
  exit 1
fi

migration_name="$1"

migration_store=src/database/migrations

migration_file="$migration_store/$migration_name"

# Generate the changes

npm run migration:generate "$migration_file"

