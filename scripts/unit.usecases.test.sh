#!/bin/bash

base="./core/use-cases/__tests__/UseCase.test.js"
find="./core/use-cases/__tests__/FindDocuments.test.js"
findOne="./core/use-cases/__tests__/FindOneDocument.test.js"
update="./core/use-cases/__tests__/UpdateDocument.test.js"
save="./core/use-cases/__tests__/SaveDocument.test.js"

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
