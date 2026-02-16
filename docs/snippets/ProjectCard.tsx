import { Github, Globe } from "lucide-react";

interface ProjectCardProps {
  title: string
  description: string
  tags?: string[]
  github?: string
  website?: string
}

export default function ProjectCard({ title, description, tags, github, website }: ProjectCardProps) {
  return (
    <div
      style={{
        border: "1px solid #dbe7ff",
        background: "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
        borderRadius: "12px",
        padding: "0.6rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.35rem",
        minWidth: 0,
        height: "118px",
        overflow: "hidden",
        boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06)",
        transition: "transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease"
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow = "0 6px 16px rgba(37, 99, 235, 0.12)";
        e.currentTarget.style.borderColor = "#bfdbfe";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 2px rgba(15, 23, 42, 0.06)";
        e.currentTarget.style.borderColor = "#dbe7ff";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", minWidth: 0 }}>
          <h3 style={{ fontSize: "0.92rem", fontWeight: "700", margin: 0, lineHeight: "1.2", color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</h3>
          {tags && tags.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", flexShrink: 0 }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.56rem",
                    fontWeight: "700",
                    color: "#1d4ed8",
                    background: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    borderRadius: "999px",
                    padding: "0.03rem 0.36rem",
                    lineHeight: "1.1",
                    whiteSpace: "nowrap"
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1d4ed8", display: "inline-flex", alignItems: "center" }}
              aria-label={`${title} GitHub`}
            >
              <Github style={{ width: "14px", height: "14px" }} />
            </a>
          )}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1d4ed8", display: "inline-flex", alignItems: "center" }}
              aria-label={`${title} Website`}
            >
              <Globe style={{ width: "14px", height: "14px" }} />
            </a>
          )}
        </div>
      </div>

      <p
        style={{
          margin: 0,
          fontSize: "0.78rem",
          color: "#64748b",
          lineHeight: "1.32",
          maxHeight: "3.96em",
          overflow: "hidden"
        }}
      >
        {description}
      </p>

    </div>
  );
}
