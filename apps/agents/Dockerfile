# Use the official Python image.
FROM python:3.10-slim

# Set the working directory.
WORKDIR /app

# Install poetry.
RUN pip install poetry

# Copy the project files.
COPY pyproject.toml poetry.lock* ./

# Install dependencies.
RUN poetry install --no-dev

# Copy the rest of the application code.
COPY src/ ./src/

# Expose the port the app runs on.
EXPOSE 8000

# Run the application.
CMD ["poetry", "run", "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
