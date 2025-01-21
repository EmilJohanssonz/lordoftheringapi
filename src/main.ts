import "./style.scss";

// nav
import { renderNav } from "./comp/nav-footer-section/nav/nav";
renderNav();

// books
import { printMiddleEarthBooks,fetchAllBooksAndChapters} from "./comp/main/books/books";
printMiddleEarthBooks();
fetchAllBooksAndChapters();


//movies
import { fetchMovies} from "./comp/main/movies/movies";
fetchMovies();




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
