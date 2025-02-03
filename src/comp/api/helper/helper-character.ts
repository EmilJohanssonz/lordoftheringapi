import { headers } from "../../api/api";
import { Character } from "types/Character";

// Felkod error (status 429)
export const fetchCharactersWithRetry = async (
  retries: number = 5,
  delay: number = 2000,
): Promise<Character[]> => {
  try {
    const response = await fetch("https://the-one-api.dev/v2/character?sort=name", {
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