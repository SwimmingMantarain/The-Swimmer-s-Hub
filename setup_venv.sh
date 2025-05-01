#!/bin/bash

# Check if virutal environment exists
if [ -d ".venv" ]; then
    echo "Virtual environment already exists."
    read -p "Do you want to delete it? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf .venv
        echo "Virtual environment deleted."
    else
        echo "Virtual environment not deleted."
    fi
fi

# Create a new virutal environment
echo "Creating new virtual environment"
python3 -m venv .venv > /dev/null

# Switch to new virt. env.
source .venv/bin/activate

# Update pip
echo "Upgrading pip"
pip install --upgrade pip > /dev/null

# Install requirements.txt
echo "Installing requirements"
pip3 install -r requirements.txt > /dev/null

# Clear the terminal
clear
