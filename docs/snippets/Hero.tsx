import { GithubIcon, LinkedinIcon } from "./BrandIcons.tsx";

interface HeroProps {
  name?: string
  tagline?: string
  bio?: string
  github?: string
  x?: string
  linkedin?: string
}

export default function Hero({
  name = "Sawyer Cutler",
  tagline = "VP Developer Success at SKALE. Building AI systems, agents, and blockchain infrastructure.",
  bio = "I write about AI tools, agents, developer tools, and agentic commerce.",
  github = "https://github.com/thegreataxios",
  x = "https://x.com/thegreataxios",
  linkedin = "https://linkedin.com/in/sawyercutler"
}: HeroProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: "2rem",
        padding: "2rem 0 3rem",
        borderBottom: "1px solid #e2e8f0",
        marginBottom: "2rem",
        flexWrap: "wrap"
      }}
    >
      {/* Avatar - Left Side */}
      <div
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid #e2e8f0",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
          flexShrink: 0
        }}
      >
        <img
          src="/sawyercutler.jpg"
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
      </div>

      {/* Content - Right Side */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          flex: 1,
          minWidth: "280px"
        }}
      >
        {/* Name and Tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              margin: 0,
              color: "#0f172a",
              lineHeight: "1.2"
            }}
          >
            Hi, I'm {name.split(" ")[0]}.
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#475569",
              margin: 0,
              lineHeight: "1.5",
              maxWidth: "600px"
            }}
          >
            {tagline}
          </p>
        </div>

        {/* Bio */}
        <p
          style={{
            fontSize: "0.95rem",
            color: "#64748b",
            margin: 0,
            lineHeight: "1.6",
            maxWidth: "600px"
          }}
        >
          {bio}
        </p>

        {/* Social Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
            marginTop: "0.25rem"
          }}
        >
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "#2563eb",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: "500",
                transition: "opacity 0.15s ease"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              <GithubIcon size={18} />
              <span>GitHub</span>
            </a>
          )}
          {x && (
            <a
              href={x}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "#2563eb",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: "500",
                transition: "opacity 0.15s ease"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              <span style={{ fontSize: "1rem" }}>𝕏</span>
              <span>Twitter/X</span>
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "#2563eb",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: "500",
                transition: "opacity 0.15s ease"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              <LinkedinIcon size={18} />
              <span>LinkedIn</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
