#!/bin/bash

create="./__tests__/e2e/create.test.js"
get="./__tests__/e2e/get.test.js"
getOne="./__tests__/e2e/getOne.test.js"
update="./__tests__/e2e/update.test.js"
delete="./__tests__/e2e/delete.test.js"

files=(
    "$create"
    "$get"
    "$getOne"
    "$update"
    "$delete"
)

if [ $# -eq 0  ]; then

    for file in "${files[@]}"; do
        node "$file"
    done

    exit 0
fi

test=$1

case $test in
    "create")
        node "$create"
        ;;
    "get")
        node "$get"
        ;;
    "getOne")
        node "$getOne"
        ;;
    "update")
        node "$update"
        ;;
    "delete")
        node "$delete"
        ;;
    *)
        echo "Invalid option: $test is not a test"
        exit 1
        ;;
esac
