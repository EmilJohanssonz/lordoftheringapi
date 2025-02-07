import { headers } from "../../api/api";
import { Quote } from "types/quotes";
import { fetchCharactersWithRetry } from "../../api/helper/helper-character";
import { fetchQuotesWithRetry } from "../../api/helper/helper-quote";

//TODO: quote

// Funktion för att hämta ett slumpmässigt citat med karaktärens namn
// pick används för att bara hämta typerna character och dialog,och inte de andra typerna från Quotes.

export const getRandomQuote = async (): Promise<
  Pick<Quote, "character" | "dialog">
> => {
  const [quotes, characters] = await Promise.all([
    fetchQuotesWithRetry(),
    fetchCharactersWithRetry(),
  ]);

  if (quotes.length === 0) {
    console.warn("No quotes available.");
    return { character: "Unknown", dialog: "No quotes available." };
  }

  // Skapa en mappning av character IDs till namn
  const characterMap = characters.reduce(
    (map, character) => {
      if (character._id && character.name) {
        map[character._id] = character.name;
      }
      return map;
    },
    {} as { [key: string]: string },
  );

  // Hämta ett slumpmässigt citat
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Matcha ID till namn
  return {
    character: randomQuote.character
      ? characterMap[randomQuote.character] || "Unknown"
      : "Unknown",
    dialog: randomQuote.dialog,
  };
};

// returnera ett quote och karaktärs namn i en div
export const displayQuoteWithCharacterDetails = (
  characterName: string,
  quote: string,
) => {
  const quoteContainer = document.getElementById("quote-container");
  if (!quoteContainer) return;

  quoteContainer.innerHTML = `
    <div class="quote-card">
      <h2>"${quote}"</h2>
      <p>— ${characterName}</p>
    </div>
  `;
};

export const createDynamicElements = async () => {
  const body = document.body;

  const container = document.createElement("div");
  container.id = "container";

  const quoteHead = document.createElement("h3");
  quoteHead.innerHTML = "Quote";
  container.appendChild(quoteHead);

  // Skapa quote-container
  const quoteContainer = document.createElement("div");
  quoteContainer.id = "quote-container";

  const imgContainer = document.createElement("div");
  imgContainer.id = "img-container";
  const img = document.createElement("img");
  img.src = "/img/jrr.jpg";
  img.alt = "J.R.R. Tolkien";
  img.className = "jrr-img";
  const imgCaption = document.createElement("p");
  imgCaption.innerHTML = "J.R.R. Tolkien";

  container.appendChild(imgContainer);
  imgContainer.appendChild(img);
  imgContainer.appendChild(imgCaption);
  container.appendChild(quoteContainer);
  body.appendChild(container);

  const button = document.createElement("button");
  button.id = "generate-quote-button";
  container.appendChild(button);

  // funktionen returenar ett objekt som innehåller en karaktär och dialog
  // sedan lagras detta i en variabel och visas i displayQuoteWithCharacterDetails
  // sedan skickar jag variablerna som argument till displayQuoteWithCharacterDetails

  const { character, dialog } = await getRandomQuote();
  displayQuoteWithCharacterDetails(character, dialog);
};

export const setupGenerateQuoteButton = () => {
  const button = document.getElementById("generate-quote-button");
  if (button) {
    button.addEventListener("click", async () => {
      const { character, dialog } = await getRandomQuote();
      displayQuoteWithCharacterDetails(character, dialog);
    });
  }
};
