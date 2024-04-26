# Society Events Frontend

This project contains the front-end code for the Society Events API. It is built using React and Chakra UI.

## Project Setup

### Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install dependencies using `npm install` or `yarn install`.

### Running the Application

1. Start the development server with `npm start` or `yarn start`.
2. The application will be accessible at `http://localhost:3000/`.

## Project Structure

The project structure is as follows:

- `src/`: Contains all the source code for the application.
  - `components/`: Contains reusable components used throughout the application.
    - `Login.jsx`: Component for user login.
    - `CreateEventForm.jsx`: Component for creating a new event.
    - `EventDisplay.jsx`: Component for displaying event details.
    - `SignUp.jsx`: Component for user signup.
    - `LandingPage.jsx`: Component for the landing page.
    - `SignUpForm.jsx`: Component for creating a new user account.
  - `pages/`: Contains top-level page components.
    - `HomePage.jsx`: Component for the home page.
  - `App.jsx`: Main component that sets up routes and theme for the application.
  - `ColorModeSwitcher.jsx`: Component for toggling color modes (light/dark).
- `public/`: Contains static assets and the `index.html` file.

## Routes

- `/`: Landing page.
- `/login`: Login page.
- `/createEvent`: Page for creating a new event.
- `/event`: Page for displaying event details.
- `/signUp`: Signup page.
- `/homePage`: Home page after user authentication.

## Components

The project includes the following key components:

- `Navbar.jsx`: Navigation bar component.
- `Footer.jsx`: Footer component.
- `LandingPage.jsx`: Landing page component with benefits, event types, and other details.
- `Login.jsx`: Component for user login with form validation and submission.
- `CreateEventForm.jsx`: Component for creating a new event with form submission and confirmation modal.
- `EventDisplay.jsx`: Component for displaying event details with comments.
- `SignUpForm.jsx`: Component for creating a new user account with form validation and submission.
- `HomePage.jsx`: Component for the home page with create event form, event display, and footer.

## Contributing

Feel free to contribute to the development of this front-end application! You can open issues for bugs or feature requests, or submit pull requests with improvements.

## Technologies Used

- React: JavaScript library for building user interfaces.
- Chakra UI: Component library for React applications.
- Axios: HTTP client for making API requests.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
