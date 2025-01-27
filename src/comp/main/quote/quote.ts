import { headers } from "../../api/api";
import { Quote } from "types/quotes";
import { fetchCharactersWithRetry } from "../characters/characters";

// Funktion för att hämta citat med retries
const fetchQuotesWithRetry = async (
  retries: number = 5,
  delay: number = 2000,
): Promise<Quote[]> => {
  try {
    const response = await fetch("https://the-one-api.dev/v2/quote", {
      headers,
    });
    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        console.warn("API rate limit exceeded. Retrying...");
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchQuotesWithRetry(retries - 1, delay);
      }
      throw new Error(`Failed to fetch quotes. Status: ${response.status}`);
    }
    const data = await response.json();
    return data.docs;
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return [];
  }
};

// Funktion för att hämta ett slumpmässigt citat med karaktärens namn
export const getRandomQuote = async (): Promise<{
  name: string;
  quote: string;
}> => {
  const [quotes, characters] = await Promise.all([
    fetchQuotesWithRetry(),
    fetchCharactersWithRetry(),
  ]);

  if (quotes.length === 0) {
    console.warn("No quotes available.");
    return { name: "Unknown", quote: "No quotes available." };
  }

  // Skapa en mappning av character IDs till namn
  const characterMap = characters.reduce(
    (map, character) => {
      if (character._id && character.name) {
        map[character._id] = character.name;
      } else {
        console.warn("Invalid character data:", character);
      }
      return map;
    },
    {} as { [key: string]: string },
  );

  // Hämta ett slumpmässigt citat
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Matcha ID till namn
  const characterName = randomQuote.character
    ? characterMap[randomQuote.character] || "Unknown"
    : "Unknown";

  return {
    name: characterName,
    quote: randomQuote.dialog,
  };
};

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

export const createDynamicElements = () => {
  const body = document.body;

  const container = document.createElement("div");
  container.id = "container";

  // Skapa quote-container
  const quoteContainer = document.createElement("div");
  quoteContainer.id = "quote-container";

  const imgContainer = document.createElement("div");
  imgContainer.id = "img-container";
  const img = document.createElement("img");
  img.src = "src/img/jrr.jpg"; 
  img.alt = "J.R.R. Tolkien";
  img.className = "jrr-img";
  imgContainer.appendChild(img);

  container.appendChild(imgContainer);
  container.appendChild(quoteContainer);
  body.appendChild(container);

  const button = document.createElement("button");
  button.id = "generate-quote-button";
  button.innerHTML = "Quote";
  body.appendChild(button);
};

export const setupGenerateQuoteButton = () => {
  const button = document.getElementById("generate-quote-button");
  if (button) {
    button.addEventListener("click", async () => {
      const { name, quote } = await getRandomQuote();
      displayQuoteWithCharacterDetails(name, quote); 
    });
  }
};


