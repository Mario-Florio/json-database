#!/bin/bash

find="./__tests__/e2e/find.test.js"
findById="./__tests__/e2e/findById.test.js"
findByIdAndDelete="./__tests__/e2e/findByIdAndDelete.test.js"
findByIdAndUpdate="./__tests__/e2e/findByIdAndUpdate.test.js"
findOne="./__tests__/e2e/findOne.test.js"
findOneAndDelete="./__tests__/e2e/findOneAndDelete.test.js"
findOneAndUpdate="./__tests__/e2e/findOneAndUpdate.test.js"
virtuals="./__tests__/e2e/virtuals.test.js"

files=(
    "$find"
    "$findById"
    "$findByIdAndDelete"
    "$findByIdAndUpdate"
    "$findOne"
    "$findOneAndDelete"
    "$findOneAndUpdate"
    "$virtuals"
)

if [ $# -eq 0  ]; then

    for file in "${files[@]}"; do
        node "$file"
    done

    exit 0
fi

test=$1

case $test in
    "find")
        node "$find"
        ;;
    "findById")
        node "$findById"
        ;;
    "findByIdAndDelete")
        node "$findByIdAndDelete"
        ;;
    "findByIdAndUpdate")
        node "$findByIdAndUpdate"
        ;;
    "findOne")
        node "$findOne"
        ;;
    "findOneAndDelete")
        node "$findOneAndDelete"
        ;;
    "findOneAndUpdate")
        node "$findOneAndUpdate"
        ;;
    "virtuals")
        node "$virtuals"
        ;;
    *)
        echo "Invalid option: $test is not a test"
        exit 1
        ;;
esac
