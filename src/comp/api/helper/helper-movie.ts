import { Movie } from "../../../types/movies";
import { headers } from "../../api/api";


let cachedMovies: Movie[] | null = null; // Cache for storing movie data

// Retry-funktion för att hantera API-fel (status 429) med exponential backoff
export const fetchMoviesWithRetry = async (
  retries: number = 5,
  delay: number = 2000,
): Promise<Movie[]> => {
  try {
    const response = await fetch("https://the-one-api.dev/v2/movie", {
      headers,
    });

    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        console.warn("API rate limit exceeded. Retrying...");
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchMoviesWithRetry(retries - 1, delay * 2); 
      }
      throw new Error(`Failed to fetch movies. Status: ${response.status}`);
    }

    const data = await response.json();
    return data.docs;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Fetch movie bara om det inte finns någon cachad data
export const fetchMovies = async (): Promise<Movie[]> => {
  if (cachedMovies) {
    console.log("Returning cached movies");
    return cachedMovies; 
  }

  try {
    const movies = await fetchMoviesWithRetry();
    cachedMovies = movies; 
    return movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};