#!/bin/bash

# Create logs directory if it doesn't exist
mkdir -p logs

# Check if the backend directory exists
if [ -d "backend" ]; then
  echo "Starting Flask backend..."
  cd backend

  # Check if the virtual environment exists
  if [ ! -d "venv" ]; then
    echo "Virtual environment not found! Creating one..."
    python3 -m venv venv
  fi

  # Activate the virtual environment
  source venv/bin/activate

  # Install necessary dependencies
  pip install -r requirements.txt

  # Set environment variables for Flask
  export FLASK_APP=app.py
  export FLASK_ENV=development

  # Run the Flask server in the background and log output
  flask run > ../logs/backend.log 2>&1 &
  backend_pid=$!
  cd ..
else
  echo "Error: Backend directory not found!"
  exit 1
fi

# Check if the frontend directory exists
if [ -d "frontend" ]; then
  echo "Starting React frontend..."
  # Open a new terminal window and run React frontend and log output
  cd frontend
  npm start > ../logs/frontend.log 2>&1 &
  frontend_pid=$!
  cd ..
else
  echo "Error: Frontend directory not found!"
  exit 1
fi

# Wait for user to stop the processes
echo "Both Flask and React servers are running."
echo "Press [CTRL+C] to stop both servers."

# Catch the CTRL+C signal to stop both Flask and React processes
trap "kill $backend_pid $frontend_pid; exit 0" SIGINT

# Wait to keep the script running until user presses CTRL+C
wait

# Deactivate the virtual environment after the Flask server stops
deactivate

# Clear the terminal so I don't have to
clear
