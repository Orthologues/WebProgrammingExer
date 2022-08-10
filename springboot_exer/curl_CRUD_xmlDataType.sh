#! /usr/bin/bash

# Run this command with sudo access!

# install jq and xmllint to beautify XML/JSON response bodies if 
if ! command -v jq &> /dev/null; then
    sudo apt install -y jq
fi &&
if ! command -v xmllint &> /dev/null; then
    sudo apt install -y libxml2-utils
fi &&

# Create a invalid user that throws an exception
echo -e "\n Create an invalid user with an invalid name: "
curl -sX POST localhost:8080/users \
    -H "Content-Type: application/json" \
    -d '{"name": "A", "USD": 50000000.8}' | jq --color-output .

# Create another invalid user that throws an exception
echo -e "\n Create another invalid user with too much money: "
curl -sX POST localhost:8080/users \
    -H "Content-Type: application/json" \
    -d '{"name": "Ksenia", "USD": 150000000}' | jq --color-output .

# Create a user
echo -e "\n Create a valid user: "
curl -sX POST localhost:8080/users \
    -H "Content-Type: application/json" \
    -d '{"name": "Vladimir", "USD": 80000000.8}' | jq --color-output .

# Retrive all users and test XML response body
echo -e "\n Get all users: "
curl -sX GET localhost:8080/users -H "Accept: application/xml" | xmllint --format -

# Update the deposit of a user (deposit) and test XML response body
echo -e "\n Update a user: "
curl -sX PATCH localhost:8080/users/2 \
    -H "Content-Type: application/json"  -H "Accept: application/xml" \
    -d '{"amount": 120.5}' | xmllint --format -

# Update the deposit of a user (consumption)
echo -e "\n Update Hanna's account again: "
curl -sX PATCH localhost:8080/users/2 \
    -H "Content-Type: application/json" -d '{"amount": -29.8}' | jq --color-output .

# Update USD owned by "Vladimir" which would return to an exception of constraint
echo -e "\n Update another user which leads to an exception: "
curl -sX PATCH localhost:8080/users/4 \
    -H "Content-Type: application/json" -d '{"amount": -90000000.3}' | jq --color-output .

# Delete the user with id=3
echo -e "\n Delete a user: "
curl -sX DELETE localhost:8080/users/3 | jq --color-output .

# Retrive all users again
echo -e "\n Get all users again: "
curl -sX GET localhost:8080/users| jq --color-output .

