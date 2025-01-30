import "./footer.scss";
export function renderFooter() {
  const footerContainer = document.createElement("footer");
  footerContainer.classList.add("footer-container");
  footerContainer.innerHTML = `
    <div class="footer">
      <a href="https://github.com/EmilJohanssonz/lordoftheringapi" target="_blank">
        <img src="./src/img/github.png" alt="github" />
      </a>
      <p>Created by Emil Håkanzon</p>
    </div>
  `;
  document.body.appendChild(footerContainer);
}

