import "./nav.scss";
export function renderNav() {
  const navHeader = document.createElement("nav");
  navHeader.classList.add("navHeader");

  navHeader.innerHTML = `
 
  <div class="logo">
  <nav class="nav" id="home">
  <img src="./src/img/ringen-removebg-preview.png" alt="tree" />
  <h1>The Lord of the Rings</h1>
  <ul>
  <li><a href="#home">Home</a></li>
  <li><a href="#about">About</a></li>
  <li><a href="#books">Books</a></li>
  <li><a href="#movies">Movies</a></li>
  <li><a href="#characters">Characters</a></li>
  <li><a href="#quotes">Quotes</a></li>
  </ul>
  </nav>
    </div>
    <div class="hero">
    <p class="heroText">One ring to rule them all</p>
    <button class="cta">Explore the journey
</button>
  </div>
  <section class="about" id="about">
  <h2>About This Project</h2>
  <p>J.R.R. Tolkien's The Lord of the Rings and the expansive legendarium he crafted are truly extraordinary.
This showcase highlights some of Tolkien's incredible works. As a devoted fan, I hold them in the highest regard. If you're curious about the design behind this showcase, feel free to explore my GitHub account!
</p>

  `;
  document.body.appendChild(navHeader);
}

