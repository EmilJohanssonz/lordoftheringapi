import "./style.scss";

// nav
import { renderNav } from "./comp/nav-footer-section/nav/nav";
renderNav();

// books
import {
  printMiddleEarthBooks,
  fetchAllBooksAndChapters,
} from "./comp/main/books/books";
printMiddleEarthBooks();
fetchAllBooksAndChapters();

//movies
import { renderAllMovies } from "./comp/main/movies/movies";
renderAllMovies();

// character
import { insertSearchAndResultsContainers } from "./comp/main/characters/characters";
document.addEventListener("DOMContentLoaded", insertSearchAndResultsContainers);

// quote
import {
  createDynamicElements,
  setupGenerateQuoteButton,
} from "./comp/main/quote/quote";

document.addEventListener("DOMContentLoaded", () => {
  createDynamicElements(); 
  setupGenerateQuoteButton(); 
});