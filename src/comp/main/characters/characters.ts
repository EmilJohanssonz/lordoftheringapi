
import { headers } from "../../api/api";
import { Character } from "types/Character";

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
await fetchCharactersWithRetry();

// sök funktion
const searchContainer = document.createElement("div");
searchContainer.className = "search-container";

const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Search for a character...";
searchInput.className = "search-input";

const searchButton = document.createElement("button");
searchButton.textContent = "Search";
searchButton.className = "search-button";

const resultsContainer = document.createElement("div");
resultsContainer.className = "results-container";

searchContainer.appendChild(searchInput);
searchContainer.appendChild(searchButton);
document.body.appendChild(searchContainer);
document.body.appendChild(resultsContainer);

export const displaySearchResults = async () => {
  const searchTerm = searchInput.value.trim();

  if (searchTerm.length < 3) {
    resultsContainer.innerHTML = "<p>Please enter at least 3 characters.</p>";
    return;
  }

  resultsContainer.innerHTML = "<p>Loading...</p>";

  const results = await searchCharacters(searchTerm);
  resultsContainer.innerHTML = "";

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
        <li>Wiki: ${character.wikiUrl || "Unknown"} </li>
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

const searchCharacters = async (searchTerm: string): Promise<Character[]> => {
  const characters = await fetchCharactersWithRetry();
  return characters.filter((character) =>
    character.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};


// TODO: Fixaså att sök funktionen hamnar bakom movie sectionen