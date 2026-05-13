// --- [타입 정의] ---
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

// --- [자식 컴포넌트: ProjectCard] ---
export function ProjectCard({ project, theme, accentColor }: ProjectCardProps) {
  // 상태 글자와 점 등에 사용될 컬러 [cite: 40]
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
          // 이미지가 없을 때의 기본 URL 유지 [cite: 42, 43]
          src={
            project.image ||
            "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200"
          }
          alt={project.title}
          style={{
            ...projectImageStyle,
            // 이미지 배경색 p.color 유지 [cite: 44, 45]
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
          <div style={{ ...statusDotStyle, backgroundColor: displayColor }} />
          {project.status}
        </div>

        <h3 style={{ ...projectTitleStyle, color: theme.text }}>
          {project.title}
        </h3>
        <p style={{ ...projectDescStyle, color: theme.text, opacity: 0.7 }}>
          {project.desc}
        </p>

        <a
          // 링크가 "https://"이거나 비어있을 때 "#" 반환 [cite: 52, 53]
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
            {/* 버튼 텍스트 기본값 유지 [cite: 55, 56] */}
            {project.action || "Try it"} →
          </div>
        </a>
      </div>
    </div>
  );
}

// --- [부모 컴포넌트: ProjectList] ---
export function ProjectList({
  projects,
  theme,
  accentColor,
  viewAllLink,
}: ProjectListProps) {
  // 프로젝트가 없거나 모두 Clear 처리된 경우 렌더링하지 않음
  if (!projects || projects.length === 0) return null;
  const activeProjects = projects.filter((p) => p && !p.isCleared);
  if (activeProjects.length === 0) return null;

  return (
    <>
      {/* 반응형 레이아웃을 위한 CSS 스타일 주입 */}
      <style>
        {`
          .responsive-project-card {
            display: grid;
            grid-template-columns: 260px 1fr;
            gap: 24px;
          }
          /* 모바일 환경(768px 이하)에서 1열 레이아웃으로 변경 */
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

// --- [스타일 정의 (이동됨)] ---
const projectSectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "32px",
}; // [cite: 160]

const sectionTitleStyle = { fontSize: "30px", fontWeight: 700 }; // [cite: 161]
const viewAllStyle = { fontSize: "14px", fontWeight: 600, cursor: "pointer" }; // [cite: 161]

const projectListStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "24px",
}; // [cite: 162]

// 기존 인라인 grid 속성은 클래스로 분리하고 나머지 스타일만 유지 [cite: 163]
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
}; // [cite: 164]

const projectImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "contain" as const,
  padding: "10px",
}; // [cite: 165]

const projectContentStyle = {
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
}; // [cite: 166]

const projectStatusStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
  fontWeight: 500,
}; // [cite: 167]

const statusDotStyle = { width: "8px", height: "8px", borderRadius: "50%" }; // [cite: 168]

const projectTitleStyle = {
  fontSize: "24px",
  fontWeight: 700,
  margin: "12px 0 8px 0",
}; // [cite: 169]

const projectDescStyle = {
  fontSize: "16px",
  lineHeight: 1.6,
  marginBottom: "16px",
}; // [cite: 170]

const projectActionStyle = { fontSize: "16px", fontWeight: 600 }; // [cite: 171]
