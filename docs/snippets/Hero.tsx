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
        I build AI agents, agent tooling, and write about putting AI to work.
      </p>
      <p>
        Recent work includes{" "}
        <a href="https://github.com/corbitsdev/corbits-code" target="_blank" rel="noopener noreferrer"><b>Corbits Code</b></a>,{" "}
        <a href="https://github.com/corbitsdev/workbench" target="_blank" rel="noopener noreferrer"><b>Workbench</b></a>,{" "}
        <a href="https://github.com/thegreataxios/pulumi-railway" target="_blank" rel="noopener noreferrer"><b>pulumi-railway</b></a>, and{" "}
        <a href="https://github.com/thegreataxios/pi-extensions" target="_blank" rel="noopener noreferrer"><b>pi-extensions</b></a>.
      </p>
      <p>
        I'm researching applied AI in the tools teams already use — and getting more out of smaller models along the way.
      </p>
      <p>
        I write about applied AI and agent infrastructure.
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
