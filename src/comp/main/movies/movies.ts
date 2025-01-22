import { Movie } from "types/movies";
import { headers } from "../../api/api";

let cachedMovies: Movie[] | null = null; // Cache for storing movie data

// Retry-funktion för att hantera API-fel (status 429) med exponential backoff
const fetchMoviesWithRetry = async (
  retries: number = 5,
  delay: number = 2000,
): Promise<Movie[]> => {
  try {
    const response = await fetch("https://the-one-api.dev/v2/movie", {
      headers,
    });

    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        console.warn("API rate limit exceeded. Retrying...");
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchMoviesWithRetry(retries - 1, delay * 2); // Exponential backoff
      }
      throw new Error(`Failed to fetch movies. Status: ${response.status}`);
    }

    const data = await response.json();
    return data.docs;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Fetch movies only if they are not cached
const fetchMovies = async (): Promise<Movie[]> => {
  if (cachedMovies) {
    console.log("Returning cached movies");
    return cachedMovies; // Return cached data if available
  }

  try {
    const movies = await fetchMoviesWithRetry();
    cachedMovies = movies; // Cache the fetched movies
    return movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Bilder baserade på filmens ID
const movieImages: { [key: string]: string } = {
  "5cd95395de30eff6ebccde58": "src/img/hobbitt.jpg", // The Hobbit: An Unexpected Journey
  "5cd95395de30eff6ebccde59": "src/img/hobbit2.jpg", // The Hobbit: The Desolation of Smaug
  "5cd95395de30eff6ebccde5a": "src/img/hobbit3.jpg", // The Hobbit: The Battle of the Five Armies
  "5cd95395de30eff6ebccde5c": "src/img/lordofrings.jpg", // The Fellowship of the Ring
  "5cd95395de30eff6ebccde5b": "src/img/ring2.jpg", // The Two Towers
  "5cd95395de30eff6ebccde5d": "src/img/ring3.jpg", // The Return of the King
};

// Ordning för filmerna
const movieOrder: string[] = [
  "5cd95395de30eff6ebccde58", // The Hobbit: An Unexpected Journey
  "5cd95395de30eff6ebccde59", // The Hobbit: The Desolation of Smaug
  "5cd95395de30eff6ebccde5a", // The Hobbit: The Battle of the Five Armies
  "5cd95395de30eff6ebccde5c", // The Two Towers
  "5cd95395de30eff6ebccde5b", // The Fellowship of the Ring
  "5cd95395de30eff6ebccde5d", // The Return of the King
];

// Sortera filmer baserat på ordningen i `movieOrder`
const sortMovies = (movies: Movie[]): Movie[] => {
  return movies.sort((a, b) => {
    return movieOrder.indexOf(a._id) - movieOrder.indexOf(b._id);
  });
};

const createMovieSlider = (movies: Movie[]) => {
  console.log("Creating movie slider with movies:", movies);

  const movieContainer = document.createElement("div");
  movieContainer.className = "movie-container";

  const movieCard = document.createElement("div");
  movieCard.className = "movie-card";
  movieContainer.appendChild(movieCard);

  let currentIndex = 0;

  const renderMovie = (index: number) => {
    const movie = movies[index];
    const imageUrl = movieImages[movie._id] || "src/img/default.jpg";

    movieCard.innerHTML = `
      <img src="${imageUrl}" alt="${movie.name}" class="movie-image">
      <h3>${movie.name}</h3>
      <p>${movie.runtimeInMinutes} minutes</p>
      <div class="movie-details">
        <p>Budget: ${movie.budgetInMillions} million</p>
        <p>Revenue: ${movie.boxOfficeRevenueInMillions} million</p>
        <p>Academy Awards: ${movie.academyAwardWins} wins</p>
      </div>
    `;
  };

  renderMovie(currentIndex);

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.onclick = () => {
    currentIndex = (currentIndex - 1 + movies.length) % movies.length;
    renderMovie(currentIndex);
  };

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.onclick = () => {
    currentIndex = (currentIndex + 1) % movies.length;
    renderMovie(currentIndex);
  };

  buttonContainer.appendChild(prevButton);
  buttonContainer.appendChild(nextButton);
  movieContainer.appendChild(buttonContainer);

  const existingMovieContainer = document.querySelector(".movie-container");
  if (existingMovieContainer) {
    console.log("Movie container already exists. Removing existing container.");
    existingMovieContainer.remove();
  }

  const bookContainer = document.querySelector(".books-container");
  if (bookContainer) {
    console.log("Inserting movie container after book container");
    bookContainer.insertAdjacentElement("afterend", movieContainer);
  } else {
    console.error("No book container found");
    document.body.appendChild(movieContainer);
  }
};

 export const renderAllMovies = async () => {
  const movies = await fetchMovies();
  console.log("Fetched movies:", movies);

  if (movies.length > 0) {
    const sortedMovies = sortMovies(movies).filter((movie) =>
      movieOrder.includes(movie._id),
    );
    createMovieSlider(sortedMovies);
  } else {
    console.error("No movies found");
  }
};

