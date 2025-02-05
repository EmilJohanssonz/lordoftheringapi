//todo: type filmer
export interface Movie {
  [x: string]: any;
  id: string;
  name: string;
  runtimeInMinutes: number;
  academyAwardNominations: number;
  academyAwardWins: number;
  budgetInMillions: number;
  boxOfficeRevenueInMillions: number;
}
