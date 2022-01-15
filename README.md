## Internship Task

### Tech Stack Used : -
    Backend : -
        Django 
        Django Rest Framework
        SQLite3 and Postgres(Heroku)

    Frontend : -
        ReactJS
        Chakra-UI (Component Library)
        Axios
        react-tranliterate (For typing)

### Tasks Completed : -
- Frontend Task 1 ✅ - Create a page that allows an user to enter the follo....
- Backend Task 1 ✅ -  Create a new entry in the Project table (Djang....
- Backend Task 2 ✅ - Using the wiki_title and target_lang parameters from the fron.....
- Backend Task 3 ✅ - : Split the content into sentences and store all sentenc.....
- Frontend Task 2 ✅ - Display all the sentences in the UI one-by-one (in a lef.....
- Frontend Task 3 ✅ - There should also be a dashboard, which shows the list of a....
- Frontend Task 4 ✅ - After submitting the translations from the above step, upda.....
- Bonus Frontend Task ✅ - The user must be able to type their translations in the chosen language.
- Bonus Backend Task - User Management - Have added Groups to the backend, but havent integrated it with the frontend, due to time constraint.
- Bonus Features - Added Swagger API Schema to the backend for testing and easy readability of the API.

### Code Structure : -
Backend : 
- api/views.py - Contains all the classes/functions required to serve the API and conatains the business logic.
- api/models.py - Contains the Database objects schema classes which map to the SQLite3/Postgres Database using the Django ORM.
- api/serializers.py - Contains the classes responsible to seralize the data to be saved in the database.
- api/utils.py - Contains the functions required for the functionality of the applications for ex. splitting the sentences, fetching summaries from the Wikipedia API.
- api/urls.py - Contains the URI paths of the API.

Frontend :
- components/ - all the components created/used in the pages.
- pages/ - all the pages in the app.
- lib/ - all the data related to APIs and connection to the backend.
- index.js - the entrypoint of the app.

## Hosted Links : -
    Backend API - https://internship-backend-api.herokuapp.com
    Frontend - https://internship-task-frontend.netlify.app