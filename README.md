# Movie App

This is one of the projects that I enjoyed the most. Tried to fulfill all the requirements stated in the problem statement.

# Live Url
https://movie-app-virid-alpha-69.vercel.app

## Features
* **Homepage with Infinite Scrolling or Load More:** Displays a list of popular movies fetched from the TMDB API, with infinite scroll or a "Load More" button for seamless movie exploration.
* **Search Movies:** Allows users to search for movies by title using the TMDB search API, with results displayed using the same dynamic loading mechanism.
* **Movie Details Page:** Provides detailed information about selected movies, including poster, description, genres, release date, and cast, utilizing server-side rendering with incremental static regeneration (ISR) for up-to-date content.
* **Recommendations:** Shows related movie recommendations below the details, fetched using the TMDB recommendations API.
* **Favorites/Watchlist:** Users can add or remove movies from their watchlist, which is available on a dedicated page where they can manage their saved movies.
* **Dark Mode:** Includes a dark mode toggle.
* **Global State Management:** Utilizes global state management to ensure consistent settings across the app.
* **Responsive Design:** Ensures a user-friendly and responsive experience across different devices.

## Drawbacks
However, one thing should be pointed out that, the functionality of the watchlist page does not work in the deployed version.
The way I implemented the server actions is that, to store the values of favorite movies I used **global** object to mock the database, but unfortunately, since this project is deployed in the server, the **global** object is **undefined** there. Hence the values of favorite movies are not shown in the page.

As the watchlist functionality works in the **development server**, you may clone the repository, and run the development server by running `npm run dev` and interact there to observe the functionality.

## Possible improvements
There are much more scopes for improvements of this app, including animations and user experiences. Will give it a try when I will be free again and find interest in this project.
