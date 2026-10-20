interface PageTabsProps {
  active: 'writing' | 'projects'
}

export default function PageTabs({ active }: PageTabsProps) {
  return (
    <nav className="page-tabs" aria-label="Pages">
      <a
        href="/"
        className={`page-tab${active === 'writing' ? ' page-tab--active' : ''}`}
        aria-current={active === 'writing' ? 'page' : undefined}
      >
        Writing
      </a>
      <span className="page-tab-sep">|</span>
      <a
        href="/my-projects"
        className={`page-tab${active === 'projects' ? ' page-tab--active' : ''}`}
        aria-current={active === 'projects' ? 'page' : undefined}
      >
        Projects
      </a>
    </nav>
  )
}
