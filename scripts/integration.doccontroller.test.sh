#!/bin/bash

create="./__tests__/integration/DocumentController/createDocument.test.js"
get="./__tests__/integration/DocumentController/getDocuments.test.js"
getOne="./__tests__/integration/DocumentController/getOneDocument.test.js"
update="./__tests__/integration/DocumentController/updateDocument.test.js"
delete="./__tests__/integration/DocumentController/deleteDocument.test.js"

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
