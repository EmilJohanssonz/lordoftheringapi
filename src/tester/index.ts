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
