import "./style.scss";
import { Character } from "./types/Character";
import { Quote } from "./types/quotes";
import { Movie } from "./types/movies";
import { Book, Chapter, middleEarthBooks } from "./types/books";
import { headers } from "./comp/api/api";

// nav
import { renderNav } from "./comp/nav-footer-section/nav/nav";
renderNav();

// books

import { printMiddleEarthBooks, fetchAllBooksAndChapters} from "./comp/main/books/books";
printMiddleEarthBooks();
fetchAllBooksAndChapters();



// const fetchMovies = async () => {
//   try {
//     const movieUrl = "https://the-one-api.dev/v2/movie";
//     const movieResponse = await fetch(movieUrl, { headers });
//     if (!movieResponse.ok) {
//       throw new Error(`Failed to fetch movies. Status: ${movieResponse.status}`);
//     }
//     const movieData = await movieResponse.json();

//     let movies = movieData.docs.splice(0, 2);

//     movieData.docs.forEach((movie: Movie) => {
//       console.log(`- ${movie.name}`);
//       console.log(`runtimeInMinutes: ${movie.runtimeInMinutes}`);
//       console.log(`Academy Award nominations: ${movie.academyAwardNominations}`);
//       console.log(`Academy Award wins: ${movie.academyAwardWins}`);
//       console.log(`Budget in millions: ${movie.budgetInMillions}`);
//       console.log(`Box office revenue in millions: ${movie.boxOfficeRevenueInMillions}`);
//     });
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }
// await fetchMovies();

// const fetchCharacters = async () => {
//   try {
//     const characterUrl = "https://the-one-api.dev/v2/character";
//     const characterResponse = await fetch(characterUrl, { headers });
//     if (!characterResponse.ok) {
//       throw new Error(
//         `Failed to fetch characters. Status: ${characterResponse.status}`,
//       );
//     }
//     const characterData = await characterResponse.json();

//     let characters = characterData.docs.slice(0, 5);

//     characters.forEach((character: Character) => {
//       console.log(`- ${character.name}`);
//       console.log(`Gender: ${character.gender}`);
//       console.log(`Race: ${character.birth}`);
//       console.log(`Death: ${character.death}`);
//       console.log(`Hair: ${character.hair}`);
//       console.log(`Height: ${character.height}`);
//       console.log(`Spouse: ${character.spouse}`);
//       console.log(`Wiki URL: ${character.wikiUrl}`);
//     });
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }
// await fetchCharacters();

// const fetchQuotes = async () => {
//   try {
//     const quoteUrl = "https://the-one-api.dev/v2/quote";
//     const quoteResponse = await fetch(quoteUrl, { headers });
//     if (!quoteResponse.ok) {
//       throw new Error(
//         `Failed to fetch quotes. Status: ${quoteResponse.status}`,
//       );
//     }
//     const quoteData = await quoteResponse.json();

//     let quotes = quoteData.docs.slice(0, 5);

//     quotes.forEach((quote: Quote) => {
//       console.log(`Character: ${quote.character}`);
//       console.log(`Movie: ${quote.movie}`);
//       console.log(`- ${quote.dialog}`);
//     });
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// await fetchQuotes();
