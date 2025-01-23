import { headers } from "../../api/api";
import { Character } from "types/Character";

// Felkod error (status 429)
const fetchCharactersWithRetry = async (
  retries: number = 5,
  delay: number = 2000,
): Promise<Character[]> => {
  try {
    const response = await fetch("https://the-one-api.dev/v2/character", {
      headers,
    });
    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        console.warn("API rate limit exceeded. Retrying...");
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchCharactersWithRetry(retries - 1, delay);
      }
      throw new Error(`Failed to fetch characters. Status: ${response.status}`);
    }
    const data = await response.json();
    return data.docs;
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
};

// Funktion för att söka efter karaktärer
const searchCharacters = async (searchTerm: string): Promise<Character[]> => {
  const characters = await fetchCharactersWithRetry();
  return characters.filter((character) =>
    character.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};

// skapar sökcontainer och resultatcontainer
const searchContainer = document.createElement("div");
searchContainer.className = "search-container";

const searchTitle = document.createElement("h2");
searchTitle.textContent = "Character in Middle-earth";

const searchInputContainer = document.createElement("div");
searchInputContainer.className = "search-input-container";

const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.id = "characters";
searchInput.placeholder = "Search for a character...";
searchInput.className = "search-input";

const searchButton = document.createElement("button");
searchButton.className = "search-button";

const resultsContainer = document.createElement("div");
resultsContainer.className = "results-container";

searchInputContainer.appendChild(searchInput);
searchInputContainer.appendChild(searchButton);

searchContainer.appendChild(searchTitle);
searchContainer.appendChild(searchInputContainer);
searchContainer.appendChild(resultsContainer);

// Min räddare!!! Funktion för att sätta in element efter ett annat element
const insertAfter = (newElement: HTMLElement, targetElement: HTMLElement) => {
  targetElement.parentNode?.insertBefore(newElement, targetElement.nextSibling);
};

// Funktion för att sätta in sök- och resultatcontainer
export const insertSearchAndResultsContainers = () => {
  const movieContainer = document.querySelector(".movie-container");

  if (movieContainer) {
    // Om movie container finns, sätt in sökcontainer efter den
    insertAfter(searchContainer, movieContainer as HTMLElement);
    insertAfter(resultsContainer, searchContainer as HTMLElement);
  } else {
    // Annars sätt in sökcontainer och resultatcontainer i body
    document.body.appendChild(searchContainer);
    document.body.appendChild(resultsContainer);
  }
};

// Funktion för att visa sökresultat
export const displaySearchResults = async () => {
  const searchTerm = searchInput.value.trim();

  if (searchTerm.length < 3) {
    resultsContainer.innerHTML = "<p>Please enter at least 3 characters.</p>";
    return;
  }

  resultsContainer.innerHTML = "<p>Loading...</p>";

  const results = await searchCharacters(searchTerm);
  resultsContainer.innerHTML = ""; // Clear 

  if (results.length > 0) {
    results.forEach((character) => {
      const characterElement = document.createElement("div");
      characterElement.className = "character-card";

      // karaktär information
      characterElement.innerHTML = `
        <h4>${character.name || "Unknown"}</h4>
        <ul>
          <li>Gender: ${character.gender || "Unknown"}</li>
          <li>Race: ${character.race || "Unknown"}</li>
          <li>Birth: ${character.birth || "Unknown"}</li>
          <li>Death: ${character.death || "Unknown"}</li>
          <li>Hair: ${character.hair || "Unknown"}</li>
          <li>Height: ${character.height || "Unknown"}</li>
          <li>Spouse: ${character.spouse || "Unknown"}</li>
          <li>Wiki: <a href="${character.wikiUrl}" target="_blank">${character.wikiUrl || "Unknown"}</a></li>
        </ul>
      `;

      resultsContainer.appendChild(characterElement);
    });
  } else {
    resultsContainer.innerHTML = "<p>No characters found.</p>";
  }
};

// Add event listeners
searchButton.addEventListener("click", displaySearchResults);
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    displaySearchResults();
  }
});
