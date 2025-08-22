#!/bin/bash

find="./__tests__/e2e.odm/find.test.js"
findById="./__tests__/e2e.odm/findById.test.js"
findByIdAndDelete="./__tests__/e2e.odm/findByIdAndDelete.test.js"
findByIdAndUpdate="./__tests__/e2e.odm/findByIdAndUpdate.test.js"
findOne="./__tests__/e2e.odm/findOne.test.js"
findOneAndDelete="./__tests__/e2e.odm/findOneAndDelete.test.js"
findOneAndUpdate="./__tests__/e2e.odm/findOneAndUpdate.test.js"
virtuals="./__tests__/e2e.odm/virtuals.test.js"

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
