export interface ProjectItem {
  title: string;
  status: string;
  desc: string;
  image?: string;
  color?: string;
  action?: string;
  link?: string;
  isCleared?: boolean;
  accent?: string;
}

export interface ThemeColors {
  bg: string;
  text: string;
  card: string;
  border: string;
}

interface ProjectListProps {
  projects: ProjectItem[];
  theme: ThemeColors;
  accentColor: string;
  viewAllLink?: string;
}

interface ProjectCardProps {
  project: ProjectItem;
  theme: ThemeColors;
  accentColor: string;
}

export function ProjectCard({ project, theme, accentColor }: ProjectCardProps) {
  const displayColor = project.accent || accentColor;

  return (
    <div
      className="responsive-project-card"
      style={{
        ...projectCardBaseStyle,
        backgroundColor: theme.card,
        borderColor: theme.border,
      }}
    >
      <div style={projectImageWrapperStyle}>
        <img
          src={
            project.image ||
            "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200"
          }
          alt={project.title}
          style={{
            ...projectImageStyle,

            backgroundColor: project.color || "#F5F5F7",
          }}
        />
      </div>
      <div style={projectContentStyle}>
        <div
          style={{
            ...projectStatusStyle,
            color: displayColor,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              ...statusDotStyle,
              backgroundColor: displayColor,
            }}
          />
          {project.status}
        </div>

        <h3 style={{ ...projectTitleStyle, color: theme.text }}>
          {project.title}
        </h3>
        <p
          style={{
            ...projectDescStyle,
            color: theme.text,
            opacity: 0.7,
          }}
        >
          {project.desc}
        </p>

        <a
          href={
            project.link && project.link !== "https://" ? project.link : "#"
          }
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <div
            style={{
              ...projectActionStyle,
              color: displayColor,
              cursor: "pointer",
            }}
          >
            {project.action || "Try it"} →
          </div>
        </a>
      </div>
    </div>
  );
}

export function ProjectList({
  projects,
  theme,
  accentColor,
  viewAllLink,
}: ProjectListProps) {
  if (!projects || projects.length === 0) return null;
  const activeProjects = projects.filter((p) => p && !p.isCleared);
  if (activeProjects.length === 0) return null;

  return (
    <>
      <style>
        {`
          .responsive-project-card {
            display: grid;
            grid-template-columns: 260px 1fr;
            gap: 24px;
          }
          /* Responsive layout for mobile (768px or less) */
          @media (max-width: 768px) {
            .responsive-project-card {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <div style={projectSectionHeaderStyle}>
        <h2 style={{ ...sectionTitleStyle, color: theme.text }}>
          Featured Projects
        </h2>
        <a
          href={viewAllLink || "#"}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <span style={{ ...viewAllStyle, color: accentColor }}>
            View all →
          </span>
        </a>
      </div>

      <div style={projectListStyle}>
        {activeProjects.map((p, index) => (
          <ProjectCard
            key={index}
            project={p}
            theme={theme}
            accentColor={accentColor}
          />
        ))}
      </div>
    </>
  );
}

const projectSectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "32px",
};

const sectionTitleStyle = { fontSize: "30px", fontWeight: 700 };
const viewAllStyle = { fontSize: "14px", fontWeight: 600, cursor: "pointer" };

const projectListStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "24px",
};

const projectCardBaseStyle = {
  padding: "20px",
  border: "1px solid",
  borderRadius: "24px",
};

const projectImageWrapperStyle = {
  height: "180px",
  borderRadius: "16px",
  overflow: "hidden",
  position: "relative" as const,
};

const projectImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "contain" as const,
  padding: "10px",
};

const projectContentStyle = {
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
};

const projectStatusStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
  fontWeight: 500,
};

const statusDotStyle = { width: "8px", height: "8px", borderRadius: "50%" };

const projectTitleStyle = {
  fontSize: "24px",
  fontWeight: 700,
  margin: "12px 0 8px 0",
};

const projectDescStyle = {
  fontSize: "16px",
  lineHeight: 1.6,
  marginBottom: "16px",
};

const projectActionStyle = { fontSize: "16px", fontWeight: 600 };
