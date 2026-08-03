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
        <div className="hero-role">VP Developer Success @ <a href="https://skale.space" target="_blank" rel="noopener noreferrer">SKALE</a></div>
      </div>

      <p>
        I build AI agents, experiment with tiny models, and create developer tools.
      </p>
      <p>
        My goal isn't just writing more code. It's using AI to become 100x more capable, and making tools that make that possible for others.
      </p>
      <p>
        Recent work includes{" "}
        <a href="https://github.com/corbitsdev/corbits-code" target="_blank" rel="noopener noreferrer"><b>Corbits Code</b></a>,{" "}
        <a href="https://github.com/corbitsdev/knowledge-engine" target="_blank" rel="noopener noreferrer"><b>Knowledge Engine</b></a>,{" "}
        <a href="https://github.com/corbitsdev/corbits-artifacts" target="_blank" rel="noopener noreferrer"><b>Artifacts</b></a>, and{" "}
        <a href="https://github.com/corbitsdev/corbits-mailbox" target="_blank" rel="noopener noreferrer"><b>Mailbox</b></a>.
      </p>
      <p>
        I'm researching how to apply AI within key business applications, with a focus on making it useful inside the tools teams already use.
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
