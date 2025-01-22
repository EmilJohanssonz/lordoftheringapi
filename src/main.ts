import "./style.scss";

// nav
import { renderNav } from "./comp/nav-footer-section/nav/nav";
renderNav();

// books
import { printMiddleEarthBooks,fetchAllBooksAndChapters} from "./comp/main/books/books";
printMiddleEarthBooks();
fetchAllBooksAndChapters();


//movies
import { renderAllMovies} from "./comp/main/movies/movies";
renderAllMovies();

// character
import { insertSearchAndResultsContainers } from "./comp/main/characters/characters";
document.addEventListener("DOMContentLoaded", insertSearchAndResultsContainers);

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
