#!/bin/bash

base="./__tests__/unit/use-cases/UseCase.test.js"
find="./__tests__/unit/use-cases/FindDocuments.test.js"
findOne="./__tests__/unit/use-cases/FindOneDocument.test.js"
update="./__tests__/unit/use-cases/UpdateDocument.test.js"
save="./__tests__/unit/use-cases/SaveDocument.test.js"

files=(
    "$base"
    "$find"
    "$findOne"
    "$update"
    "$save"
)

if [ $# -eq 0  ]; then

    for file in "${files[@]}"; do
        node "$file"
    done

    exit 0
fi

test=$1

case $test in
    "base")
        node "$base"
        ;;
    "find")
        node "$find"
        ;;
    "findOne")
        node "$findOne"
        ;;
    "update")
        node "$update"
        ;;
    "save")
        node "$save"
        ;;
    *)
        echo "Invalid option: $test is not a test"
        exit 1
        ;;
esac
