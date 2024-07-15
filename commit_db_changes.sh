#!/usr/bin/env bash
# This script saves the changes detected and tracted by the script: "add_db_changes.sh"
# This is similar in concept to the "git commit" command after running "git add "

npm run migration:run
