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
echo -e "\n Create another invalid user with too much USD: "
curl -sX POST localhost:8080/users \
    -H "Content-Type: application/json" \
    -d '{"name": "Ksenia", "USD": 150000000}' | jq --color-output .

# Create another invalid user that throws an exception
echo -e "\n Create another invalid user with too much DKK: "
curl -sX POST localhost:8080/users \
    -H "Content-Type: application/json" \
    -H "X-API-VERSION: 2" \
    -d '{"name": "Juliane", "DKK": 950000000}' | jq --color-output .

# Create a valid USD user
echo -e "\n Create a valid USD user: "
curl -sX POST localhost:8080/users \
    -H "Content-Type: application/json" \
    -d '{"name": "Vladimir", "USD": 80000000.8}'

# Create a valid DKK user
echo -e "\n Create a valid DKK user: "
curl -sX POST localhost:8080/users \
    -H "Content-Type: application/json" \
    -H "X-API-VERSION: 2" -H "Accept: text/plain" \
    -d '{"name": "Sergio", "DKK": 630000000}'

# Retrive all users and test XML response body
echo -e "\n Get all users: "
curl -sX GET localhost:8080/users -H "Accept: application/xml" | xmllint --format -

# Update the deposit of a USD user (deposit) and test XML response body
echo -e "\n Update a user (Anna)'s USD: "
curl -sX PATCH localhost:8080/users/2 \
    -H "Content-Type: application/json" -H "Accept: application/xml" \
    -d '{"amount": 120.5}' | xmllint --format -

# Update the deposit of a USD user (consumption)
echo -e "\n Update Anna's account again: "
curl -sX PATCH localhost:8080/users/2 \
    -H "Content-Type: application/json" -d '{"amount": -29.8}' | jq --color-output .

# Update the deposit of a DKK user (consumption)
echo -e "\n Update Hanne's account again: "
curl -sX PATCH "localhost:8080/users/2?currency=DKK" \
    -H "Content-Type: application/json" -d '{"amount": -298.5}' | jq --color-output .

# Update USD owned by "Vladimir" which would return to an exception of constraint
echo -e "\n Update another USD user which leads to an exception: "
curl -sX PATCH localhost:8080/users/4 \
    -H "Content-Type: application/json" -d '{"amount": -90000000.3}' | jq --color-output .

# Delete the user with id=3
echo -e "\n Delete a USD user: "
curl -sX DELETE localhost:8080/users/3 | jq --color-output .

# Delete the user with id=3
echo -e "\n Delete a DKK user: "
curl -sX DELETE "localhost:8080/users/1?currency=DKK" | jq --color-output .

# Retrive all users again
echo -e "\n Get all users again: "
curl -sX GET localhost:8080/users| jq --color-output .

# Retrive all USD users again
echo -e "\n Get all USD users again: "
curl -sX GET "localhost:8080/users?currency=USD"| jq --color-output .

# Retrive all DKK users again
echo -e "\n Get all DKK users again: "
curl -sX GET "localhost:8080/users?currency=DKK"| jq --color-output .
