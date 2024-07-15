#!/usr/bin/env bash
# This script reverts the latest changes made to the database schema
# The concept is similar to the "git revert" command run after "git commit"

npm run migration:revert

