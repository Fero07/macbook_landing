import { footerLinks } from "../constants";

function Footer() {
  return (
    <footer>
      <div className="info">
        <p>
          More ways to shop: Find an Apple Store or a retailer near you. Or call
          1223 2345 44
        </p>
        <img src="/logo.svg" alt="Apple logo" />
      </div>

      <hr />

      <div className="links">
        <p>Copyright © 2026 Apple Inc. All rights reserved.</p>

        <ul>
          {footerLinks.map(({ label, link }) => (
            <li key={label}>
              <a href={link}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
