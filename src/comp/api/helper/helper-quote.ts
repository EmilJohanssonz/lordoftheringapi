import { headers } from "../../api/api";
import { Quote } from "types/quotes";

// Funktion för att hämta citat med retries
export const fetchQuotesWithRetry = async (
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
