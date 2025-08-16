#!/bin/bash

base="./core/use-cases/__tests__/UseCase.test.js"

files=(
    "$base"
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
    *)
        echo "Invalid option: $test is not a test"
        exit 1
        ;;
esac
