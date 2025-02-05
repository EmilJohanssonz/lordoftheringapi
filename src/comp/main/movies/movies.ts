import { Movie } from "types/movies";
import { headers } from "../../api/api";
import { fetchMovies, fetchMoviesWithRetry } from "../../api/helper/helper-movie";

//TODO: filmer

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

  const movieHeader = document.createElement("h2");
  movieHeader.textContent = "Movies";
  movieContainer.appendChild(movieHeader);

  const movieCard = document.createElement("div");
  movieCard.className = "movie-card";
  movieContainer.appendChild(movieCard);

  let currentIndex = 0;

  const renderMovie = (index: number) => {
    const movie = movies[index];
    const imageUrl = movieImages[movie._id] || "src/img/default.jpg";

    movieCard.innerHTML = `
      <img src="${imageUrl}" alt="${movie.name}" class="movie-image" id="movies">
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
 
  // eftersom negativ index inte funger så lägger vi till följande :
  // Om currentIndex = 0, och vi subtraherar 1 och lägger till 5, får vi (0 - 1 + 5) % 5 = 4
  // % denna gör så att index värderna ligger allitd inom de giltiga indexvärdena för listan,
  //  och att om indexet går utanför gränserna, det återgår till början (eller slutet) av listan.

  const prevButton = document.createElement("button");
  prevButton.textContent = "<";
  prevButton.onclick = () => {
    currentIndex = (currentIndex - 1 + movies.length) % movies.length;
    renderMovie(currentIndex);
  };

  const nextButton = document.createElement("button");
  nextButton.textContent = ">";
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

// funktionen sortmovies tar emot listan från movies och soterar.
// sedan använder jag filter för att kolla så alla filmer har ett _id som finns i movieOrder.


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

