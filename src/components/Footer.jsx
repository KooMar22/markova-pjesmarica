import githubLogo from "../assets/images/github_logo.png";
import linkedinLogo from "../assets/images/linkedin.jpg";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-text">
        <p>ⓒ {year} MarkoDreams</p>
      </div>
      
      <div className="contact-icons">
        <a href="https://github.com/KooMar22?tab=repositories" target="_blank" rel="noopener noreferrer">
          <img src={githubLogo} alt="GitHub Logo" className="icon" />
        </a>
        <a href="https://www.linkedin.com/in/marko-jurić-305964a9" target="_blank" rel="noopener noreferrer">
          <img src={linkedinLogo} alt="LinkedIn Logo" className="icon" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;