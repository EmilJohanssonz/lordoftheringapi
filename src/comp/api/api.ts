// // API-konfiguration
// skapar en headers-variabel som innehåller en nyckel för att kunna använda API:et
// Använder header sen i fetch-anropen för att kunna hämta data från API:et

export const headers = {
  Accept: "application/json",
  Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
};
