//todo: type böcker

export interface Book {
  id: string;
  name: string;
  author: string;
  title: string;
  chapters: Chapter[];
}

export interface Chapter {
  [x: string]: any;
  id: string;
  name: string;
}

export const middleEarthBooks: Book[] = [
  {
    id: "1",
    title: "An Unexpected Journey",
    name: "The Hobbit: An Unexpected Journey",
    author: "J.R.R. Tolkien",
    chapters: [
      { id: "1-1", name: "An Unexpected Party" },
      { id: "1-2", name: "Roast Mutton" },
      { id: "1-3", name: "A Short Rest" },
      { id: "1-4", name: "Over Hill and Under Hill" },
      { id: "1-5", name: "Riddles in the Dark" },
    ],
  },
  {
    id: "2",
    title: "The Desolation of Smaug",
    name: "The Hobbit: The Desolation of Smaug",
    author: "J.R.R. Tolkien",
    chapters: [
      { id: "2-1", name: "Queer Lodgings" },
      { id: "2-2", name: "Flies and Spiders" },
      { id: "2-3", name: "Barrels Out of Bond" },
      { id: "2-4", name: "A Warm Welcome" },
      { id: "2-5", name: "Inside Information" },
    ],
  },
  {
    id: "3",
    title: "The Battle of the Five Armies",
    name: "The Hobbit: The Battle of the Five Armies",
    author: "J.R.R. Tolkien",
    chapters: [
      { id: "3-1", name: "Not at Home" },
      { id: "3-2", name: "Fire and Water" },
      { id: "3-3", name: "The Gathering of the Clouds" },
      { id: "3-4", name: "The Clouds Burst" },
      { id: "3-5", name: "The Last Stage" },
    ],
  },
  {
    id: "4",
    title: "The Silmarillion",
    name: "The Silmarillion",
    author: "J.R.R. Tolkien",
    chapters: [
      { id: "4-1", name: "Ainulindalë" },
      { id: "4-2", name: "Valaquenta" },
      { id: "4-3", name: "Quenta Silmarillion" },
      { id: "4-4", name: "Akallabêth" },
      { id: "4-5", name: "Of the Rings of Power and the Third Age" },
    ],
  },
];
