# Society Events API

This project contains an API for managing society events. It uses Django 5.0.4 and Django REST Framework to provide RESTful endpoints for creating, editing, and viewing events and comments.

## Project Setup

### Installation

1. Clone this repository to your local machine.
2. Create a virtual environment and activate the virtual environment.
3. Install project dependencies using `pip install -r requirements.txt`.

### Database Configuration

1. This project uses a SQLite3 database by default. If you want to use another database engine, modify the settings in `settings.py`.
2. Run migrations with the command `python manage.py migrate` to apply migrations to the database.

### Environment Variables

1. Create a `.env` file in the project root and configure necessary environment variables like `SECRET_KEY`, `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USE_TLS`, `EMAIL_HOST_USER`, and `EMAIL_HOST_PASSWORD`.

### Starting the Development Server

Run the development server with the command `python manage.py runserver`. The server will be available at `http://127.0.0.1:8000/`.

## Available Endpoints

1. **/api/events/** - Endpoint to get the list of events and create new events.
2. **/api/events/{id}/** - Endpoint to get details of a specific event and update or delete the event.
3. **/api/comments/** - Endpoint to create a new comment on an event.
4. **/api/token/** - Endpoint to obtain access tokens using user credentials.

## Authentication and Authorization

The API uses JWT (JSON Web Tokens) authentication to authorize requests. Endpoints are protected and only accessible to authenticated users.

To obtain an access token, make a POST request to `/api/token/` with user credentials (username and password) in the request body.

## Data Models

The project uses the following data models:

### Event

- `creator`: ForeignKey to the user table for the event creator.
- `title`: CharField for the event title.
- `description`: TextField for the event description.
- `start_date`: DateTimeField for the event start date.
- `end_date`: DateTimeField for the event end date.
- `location`: CharField for the event location.
- `participants`: ManyToManyField for event participants.
- `actual_participants`: IntegerField for the current number of participants.
- `status`: CharField for the event status (default is 'Upcoming').

### Comment

- `event`: ForeignKey to the event table for the associated event of the comment.
- `user`: ForeignKey to the user table for the user who made the comment.
- `text`: TextField for the comment text.
- `created_at`: DateTimeField for the comment creation date.

## Available URLs

The `urls.py` file contains the following URL routes to access API endpoints:

- `/`: Home page.
- `/api/token/`: Endpoint to obtain access tokens.
- `/Comment/`: Endpoint to create a comment.
- `/CreateEvent/`: Endpoint to create a new event.
- `/Commentlist/`: Endpoint to get the list of comments.
- `/Eventlist/`: Endpoint to get the list of events.
- `/EventDetail/<int:pk>/`: Endpoint to get details of a specific event.
- `/create-user/`: Endpoint to create a new user.

## Contributing

Feel free to contribute to the development of this API! Open an issue to discuss new features or encountered issues, or submit a pull request with your enhancements.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
