import { headers } from "../../api/api";
import { Character } from "types/Character";
import { fetchCharactersWithRetry } from "../../api/helper/helper-character";

//todo: karaktärer

// Funktion för att söka efter karaktärer
//Använder filtter för att filtera ut de karakäter som inte matchar.
// Vi konverterar också sökordet (searchTerm) till genener(små bokstäver)
//  för att säkerställa att jämförelsen är case-insensitive.

// includes() kollar om namnet på karaktären (nu i små bokstäver) innehåller det angivna sökordet (också i små bokstäver).
// Om det gör det, returneras true och karaktären behålls i den filtrerade arrayen. Om inte, returneras false och karaktären tas bort.

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

// Funktionen insertAfter infogar ett nytt HTML element efter ett redan existerade elementet.
// insertBefore används för att sätta ditt de nya element efter target-elementet.
// nextSibling refererar till det element som kommer direkt efter det givna elementet (targetElement) i samma förälder.
// Om targetElement är det sista barnet i sin förälder, kommer nextSibling att vara null.

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
// Använder trim att ta bort white-space från.

export const displaySearchResults = async () => {
  const searchTerm = searchInput.value.trim();

  if (searchTerm.length < 3) {
    resultsContainer.innerHTML = "<p>Please enter at least 3 characters.</p>";
    return;
  }

  resultsContainer.innerHTML =
    '<img src="/img/image-removebg-preview.png" alt="loading img..." class="loading-img" />';
  
    // skapa delay för sökresultat
  // Resolve funktionen gör att väntar på att promise är klar och sedan skickar ett argument tillbaka.
  await new Promise((resolve) => setTimeout(resolve, 2000));

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
