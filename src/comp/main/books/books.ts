import { Book, Chapter, middleEarthBooks } from "../../../types/books";
import { headers } from "../../api/api";

export function printMiddleEarthBooks() {
  const booksContainer = document.createElement("div");
  booksContainer.classList.add("books-container");

  const bookHead = document.createElement("div");
  bookHead.classList.add("bookHead");
  bookHead.innerHTML = `
    <h2>Books</h2>
    <p class="bookP">A remembrance of the journey of the ring. Click on the book title to expand and see the chapters.</p>
  `;
  booksContainer.appendChild(bookHead);

  const bookies = document.createElement("div");
  bookies.classList.add("bookies");

  const order = ["4", "1", "2", "3"];

  const sortedBooks = middleEarthBooks.sort((a, b) => {
    return order.indexOf(a.id) - order.indexOf(b.id);
  });

  sortedBooks.forEach((book: Book) => {
    const bookElement = document.createElement("div");
    bookElement.className = "book";
    bookElement.innerHTML = `
      <h5 class="bookTitle">${book.title}</h5>
      <ul class="chapters" style="display: none;">
        ${book.chapters
          .map((chapter: Chapter) => {
            return `<li>Chapter: ${chapter.name}</li>`;
          })
          .join("")}
      </ul>
    `;

    const bookTitle = bookElement.querySelector(".bookTitle");
    bookTitle?.addEventListener("click", function (this: HTMLElement) {
      const chaptersList = this.nextElementSibling as HTMLElement;
      if (chaptersList.style.display === "none") {
        chaptersList.style.display = "block";
      } else {
        chaptersList.style.display = "none";
      }
    });

    bookies.appendChild(bookElement);
  });

  booksContainer.appendChild(bookies);
  document.body.appendChild(booksContainer);
}

export async function fetchAllBooksAndChapters() {
  try {
    // Hämta alla böcker från API:t
    const bookUrl = "https://the-one-api.dev/v2/book";
    const bookResponse = await fetch(bookUrl, { headers });
    if (!bookResponse.ok) {
      throw new Error(`Failed to fetch books. Status: ${bookResponse.status}`);
    }
    const bookData = await bookResponse.json();

    const booksContainer = document.createElement("div");
    booksContainer.classList.add("books-container");

   

    const bookies = document.createElement("div");
    bookies.classList.add("bookies");

    for (const book of bookData.docs) {
      const chapterUrl = `${bookUrl}/${book._id}/chapter`;
      const chapterResponse = await fetch(chapterUrl, { headers });
      if (!chapterResponse.ok) {
        throw new Error(
          `Failed to fetch chapters for book ${book.name}. Status: ${chapterResponse.status}`,
        );
      }
      const chapterData = await chapterResponse.json();

      const bookElement = document.createElement("div");
      bookElement.className = "book";
      bookElement.innerHTML = `
        <h5 class="bookTitle">${book.name}</h5>
        <ul class="chapters" style="display: none;">
          ${chapterData.docs
            .map((chapter: Chapter) => {
              return `<li>Chapter: ${chapter.chapterName}</li>`;
            })
            .join("")}
        </ul>
      `;

      const bookTitle = bookElement.querySelector(".bookTitle");
      bookTitle?.addEventListener("click", function (this: HTMLElement) {
        const chaptersList = this.nextElementSibling as HTMLElement;
        if (chaptersList.style.display === "none") {
          chaptersList.style.display = "block";
        } else {
          chaptersList.style.display = "none";
        }
      });

      bookies.appendChild(bookElement);
    }

    booksContainer.appendChild(bookies);
    document.body.appendChild(booksContainer);
  } catch (error) {
    console.error("Error:", error);
  }
}
