//////////////BOOK/////////////////////

// export const printMiddleEarthBooks = (order: string[]) => {
//   const sortedBooks = [...middleEarthBooks].sort((a, b) => {
//     return order.indexOf(a.id) - order.indexOf(b.id);
//   });

//   sortedBooks.forEach((book: Book) => {
//     console.log(`Book: ${book.name}`);
//     book.chapters.forEach((chapter: Chapter) => {
//       console.log(`- ${chapter.name}`);
//     });
//   });
// };
// export const order = ["4", "1", "2", "3"];
// printMiddleEarthBooks(order);

// const fetchAllBooksAndChapters = async () => {
//   try {
//     // Hämta alla böcker
//     const bookUrl = "https://the-one-api.dev/v2/book";
//     const bookResponse = await fetch(bookUrl, { headers });
//     if (!bookResponse.ok) {
//       throw new Error(`Failed to fetch books. Status: ${bookResponse.status}`);
//     }
//     const bookData = await bookResponse.json();

//     for (const book of bookData.docs) {
//       console.log(`Book: ${book.name}`);

//       // Hämta kapitel för varje bok
//       const chapterResponse = await fetch(`${bookUrl}/${book._id}/chapter`, {
//         headers,
//       });
//       if (!chapterResponse.ok) {
//         throw new Error(
//           `Failed to fetch chapters for book ${book.name}. Status: ${chapterResponse.status}`,
//         );
//       }
//       const chapterData = await chapterResponse.json();
//       console.log("Chapters:");
//       chapterData.docs.forEach((chapter: Chapter) => {
//         console.log(`- ${chapter.chapterName}`);
//       });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// await fetchAllBooksAndChapters();

//////////////MOVIE/////////////////////

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

//////////////CHARACTER/////////////////////

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

//////////////QUOTE/////////////////////
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