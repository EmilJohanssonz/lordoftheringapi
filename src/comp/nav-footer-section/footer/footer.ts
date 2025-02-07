import "./footer.scss";
export function renderFooter() {
  const footerContainer = document.createElement("footer");
  footerContainer.classList.add("footer-container");
  footerContainer.innerHTML = `
    <div class="footer">
    <p>Created by Emil Håkanzon</p>
    <a href="https://github.com/EmilJohanssonz/lordoftheringapi" target="_blank">
    <img src="/img/github.png" alt="github" />
    </a>
    </div>
  `;
  document.body.appendChild(footerContainer);
}

