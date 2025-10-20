import { Github, Globe } from "lucide-react";

interface ProjectCardProps {
  title: string
  description: string
  github?: string
  website?: string
}

export default function ProjectCard({ title, description, github, website }: ProjectCardProps) {
  return (
    <>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{title}</h3>
      <p>{description}</p>

      {github && (
        <div
          style={{ display: 'flex', flexDirection: "row", alignItems: 'center', gap: '0.5rem' }}
          onMouseOver={(e) => {
            e.preventDefault();
            e.currentTarget.style.color = 'lightblue';
            e.currentTarget.style.cursor = 'pointer';
          }}
          onMouseOut={(e) => {
            e.preventDefault();
            e.currentTarget.style.color = 'inherit';
            e.currentTarget.style.cursor = 'default';
          }}
        >
          <Github style={{ width: '16px', height: '16px' }} />
          <a href={github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            {github}
          </a>
        </div>
      )}
      {website && (
        <div
          style={{ display: 'flex', flexDirection: "row", alignItems: 'center', gap: '0.5rem' }}
          onMouseOver={(e) => {
            e.preventDefault();
            e.currentTarget.style.color = 'lightblue';
            e.currentTarget.style.cursor = 'pointer';
          }}
          onMouseOut={(e) => {
            e.preventDefault();
            e.currentTarget.style.color = 'inherit';
            e.currentTarget.style.cursor = 'default';
          }}
        >
          <Globe style={{ width: '16px', height: '16px' }} />
          <a href={website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            {website}
          </a>
        </div>
      )}
      {/* <br /> */}
      <hr />
    </>
  );
}
