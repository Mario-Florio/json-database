#!/bin/bash

instantiate="./__tests__/integration/DocumentRepository.DB/instantiate.test.js"
create="./__tests__/integration/DocumentRepository.DB/create.test.js"
read="./__tests__/integration/DocumentRepository.DB/read.test.js"
update="./__tests__/integration/DocumentRepository.DB/update.test.js"
delete="./__tests__/integration/DocumentRepository.DB/delete.test.js"

files=(
    "$instantiate"
    "$create"
    "$read"
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
    "instantiate")
        node "$instantiate"
        ;;
    "create")
        node "$create"
        ;;
    "read")
        node "$read"
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
