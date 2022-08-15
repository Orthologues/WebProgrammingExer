#! /usr/bin/bash

# Run this command with sudo access!

# install jq and xmllint to beautify XML/JSON response bodies if 
if ! command -v jq &> /dev/null; then
    sudo apt install -y jq
fi &&

#user='demouser' && pwd='7U32HdpdJa24jbA2' &&
## We would need to provide base64 version of "demouser:7U32HdpdJa24jbA2" instead
## Check https://www.base64encode.org/
base64='ZGVtb3VzZXI6N1UzMkhkcGRKYTI0amJBMg==' &&

# Create a invalid user that throws an exception
echo -e "\n Create an invalid user with an invalid name: "
curl -H "Authorization:Basic $base64" -sX POST localhost:8080/jpa/users \
    -H "Content-Type: application/json" \
    -d '{"id": 18, "name": "B", "amount": 112000.8, "currency": "PLN"}' | jq --color-output .

# Create a valid primary user
echo -e "\n Create a valid primary user: "
curl -H "Authorization:Basic $base64" -sX POST localhost:8080/jpa/users \
    -H "Content-Type: application/json" \
    -d '{"id": 19, "name": "Przemek", "amount": 112000.8, "currency": "PLN"}' | jq --color-output .

# Create another valid primary user
echo -e "\n Create another valid primary user: "
curl -H "Authorization:Basic $base64" -sX POST localhost:8080/jpa/users \
    -H "Content-Type: application/json" \
    -d '{"id": 12, "name": "José", "amount": 15000.8, "currency": "EUR"}' | jq --color-output .

# Create another valid primary user
echo -e "\n Create another valid primary user: "
curl -H "Authorization:Basic $base64" -sX POST localhost:8080/jpa/users \
    -H "Content-Type: application/json" \
    -d '{"id": 6, "name": "Thomas", "amount": 28000.3, "currency": "CHF"}' | jq --color-output .

# Retrive all users and test XML response body
echo -e "\n Get all users: "
curl -H "Authorization:Basic $base64" -sX GET localhost:8080/jpa/users \
    -H "Content-Type: application/json" | jq --color-output .

# Retrieve a valid primary user
echo -e "\n Retrieve a valid DKK user: "
curl -H "Authorization:Basic $base64" -sX GET localhost:8080/jpa/users/3 \
    -H "Content-Type: application/json" | jq --color-output . \

# Delete a primary user
echo -e "\n Delete a valid DKK user: "
curl -H "Authorization:Basic $base64" -sX DELETE localhost:8080/jpa/users/1 \
    -H "Content-Type: application/json" | jq --color-output . \

# Retrive all users again
echo -e "\n Get all users again after deletion of Przemek: "
curl -H "Authorization:Basic $base64" -sX GET localhost:8080/jpa/users \
    -H "Accept: application/xml" | xmllint --format -

# Add another user
echo -e "\n Create a valid primary user that replaces Przemek: "
curl -H "Authorization:Basic $base64" -sX POST localhost:8080/jpa/users \
    -H "Content-Type: application/json" \
    -d '{"id": 20, "name": "Mateusz", "amount": 162000, "currency": "PLN"}' | jq --color-output .

# Retrive all users again
echo -e "\n Get all users again: "
curl -H "Authorization:Basic $base64" -sX GET localhost:8080/jpa/users \
    -H "Accept: application/xml" | xmllint --format -

