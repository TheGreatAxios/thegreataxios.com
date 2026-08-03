import { GithubIcon, LinkedinIcon } from "./BrandIcons.tsx";

interface HeroProps {
  name?: string
  github?: string
  x?: string
  linkedin?: string
}

export default function Hero({
  name = "Sawyer Cutler",
  github = "https://github.com/thegreataxios",
  x = "https://x.com/thegreataxios",
  linkedin = "https://linkedin.com/in/sawyercutler"
}: HeroProps) {
  return (
    <div className="about-section">
      <div className="hero-name-block">
        <div className="hero-name">{name}</div>
        <div className="hero-role">Lead Product Engineer @ <a href="https://corbits.dev" target="_blank" rel="noopener noreferrer">Corbits</a></div>
      </div>

      <p>
        I work with small and medium-sized businesses at{" "}
        <a href="https://dirtroad.dev" target="_blank" rel="noopener noreferrer"><b>Dirt Road Dev</b></a>{" "}
        to build custom software, websites, developer tools, and AI solutions. If you're interested in working with me, reach out through{" "}
        <a href="https://dirtroad.dev" target="_blank" rel="noopener noreferrer"><b>Dirt Road Dev</b></a>.
      </p>
      <p>
        Recent work includes{" "}
        <a href="https://github.com/TheGreatAxios/triage-agent" target="_blank" rel="noopener noreferrer"><b>triage-agent</b></a>,{" "}
        <a href="https://github.com/TheGreatAxios/ai-sdk-privacy-filter-middleware" target="_blank" rel="noopener noreferrer"><b>privacy-filter-middleware</b></a>,{" "}
        <a href="https://github.com/thegreataxios/prawl" target="_blank" rel="noopener noreferrer"><b>Prawl</b></a>, and{" "}
        <a href="https://github.com/TheGreatAxios/privacy-filter-python" target="_blank" rel="noopener noreferrer"><b>privacy-filter-python</b></a>.
      </p>
      <p>
        I'm researching how to make consuming AI at scale more efficient — bigger models aren't always the answer.
      </p>
      <p>
        I write about agents, developer tools, and the machine economy.
      </p>

      <div className="hero-socials">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="github"
          >
            <GithubIcon size={16} />
            <span>thegreataxios</span>
          </a>
        )}
        {x && (
          <a
            href={x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="twitter"
          >
            <span className="hero-x-icon">𝕏</span>
            <span>thegreataxios</span>
          </a>
        )}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="linkedin"
          >
            <LinkedinIcon size={16} />
            <span>sawyercutler</span>
          </a>
        )}
      </div>
    </div>
  );
}
