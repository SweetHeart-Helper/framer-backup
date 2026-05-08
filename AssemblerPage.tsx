import { addPropertyControls, ControlType } from "framer";

// 프로젝트 데이터 정의
const PROJECTS = [
  {
    title: "Mortgage Calculator",
    status: "Featured",
    desc: "A smart tool to compare real mortgage costs — not just monthly payments.",
    action: "Try it",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
    color: "#8b5cf6",
  },
  {
    title: "Recipe Finder",
    status: "In Progress",
    desc: "Click your ingredients and instantly discover recipes you can make.",
    action: "Preview",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
    color: "#3b82f6",
  },
  {
    title: "Daily Converter",
    status: "Personal Project",
    desc: "A fast and simple unit converter for everyday use.",
    action: "Try it",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    color: "#10b981",
  },
];

export default function FullProfile(props) {
  const { name, tagline, badgeText } = props;
  const techStack = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer",
  ];

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        {/* Profile Section */}
        <div style={profileHeaderStyle}>
          <div style={avatarWrapperStyle}>
            <div style={glowStyle} />
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
              alt="profile"
              style={avatarStyle}
            />
          </div>
          <h1 style={titleStyle}>{name}</h1>
          <p style={taglineStyle}>{tagline}</p>
          <div style={badgeStyle}>
            <div style={dotStyle} />
            {badgeText}
          </div>
        </div>

        {/* Tech Stack */}
        <div style={stackContainerStyle}>
          {techStack.map((item) => (
            <div key={item} style={stackItemStyle}>
              {item}
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div style={projectSectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>Featured Projects</h2>
          <span style={viewAllStyle}>View all →</span>
        </div>

        <div style={projectListStyle}>
          {PROJECTS.map((project) => (
            <div key={project.title} style={projectCardStyle}>
              <div style={projectImageWrapperStyle}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={projectImageStyle}
                />
              </div>
              <div style={projectContentStyle}>
                <div style={projectStatusStyle}>
                  <div
                    style={{
                      ...statusDotStyle,
                      backgroundColor: project.color,
                    }}
                  />
                  {project.status}
                </div>
                <h3 style={projectTitleStyle}>{project.title}</h3>
                <p style={projectDescStyle}>{project.desc}</p>
                <div style={projectActionStyle}>{project.action} →</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Framer에서 수정 가능하게 컨트롤 추가
addPropertyControls(FullProfile, {
  name: { type: ControlType.String, defaultValue: "Assembler" },
  tagline: {
    type: ControlType.String,
    defaultValue: "Building simple tools that solve real problems.",
  },
  badgeText: { type: ControlType.String, defaultValue: "Solo Developer" },
});

// CSS-in-JS 스타일 정의 (Tailwind 수동 변환)
const sectionStyle = {
  minHeight: "100vh",
  backgroundColor: "#f5f5f7",
  display: "flex",
  justifyContent: "center",
  padding: "80px 20px",
  fontFamily: "sans-serif",
};

const containerStyle = {
  width: "100%",
  maxWidth: "768px",
  backgroundColor: "white",
  borderRadius: "40px",
  padding: "48px",
  boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
  border: "1px solid #f3f4f6",
};

const profileHeaderStyle = {
  textAlign: "center" as const,
  marginBottom: "40px",
};
const avatarWrapperStyle = {
  position: "relative" as const,
  width: "144px",
  height: "144px",
  margin: "0 auto",
};
const glowStyle = {
  position: "absolute" as const,
  inset: 0,
  borderRadius: "50%",
  background: "linear-gradient(to bottom, #ddd6fe, #dbeafe)",
  filter: "blur(20px)",
  opacity: 0.6,
};
const avatarStyle = {
  position: "relative" as const,
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  objectFit: "cover" as const,
  border: "4px solid white",
  boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
};
const titleStyle = {
  fontSize: "60px",
  fontWeight: 800,
  color: "#0b1020",
  margin: "24px 0 8px 0",
  letterSpacing: "-0.04em",
};
const taglineStyle = {
  fontSize: "18px",
  color: "#6b7280",
  margin: "0 0 20px 0",
};
const badgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: "#ede9fe",
  color: "#6d28d9",
  padding: "8px 16px",
  borderRadius: "999px",
  fontSize: "14px",
  fontWeight: 500,
};
const dotStyle = {
  width: "8px",
  height: "8px",
  backgroundColor: "#8b5cf6",
  borderRadius: "50%",
};

const stackContainerStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  justifyContent: "center",
  gap: "16px",
  marginBottom: "56px",
};
const stackItemStyle = {
  padding: "16px 20px",
  border: "1px solid #f3f4f6",
  borderRadius: "16px",
  fontSize: "14px",
  fontWeight: 500,
  color: "#374151",
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
};

const projectSectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "32px",
};
const sectionTitleStyle = {
  fontSize: "30px",
  fontWeight: 700,
  color: "#0b1020",
};
const viewAllStyle = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#7c3aed",
  cursor: "pointer",
};

const projectListStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "24px",
};
const projectCardStyle = {
  display: "grid",
  gridTemplateColumns: "260px 1fr",
  gap: "24px",
  padding: "20px",
  border: "1px solid #f3f4f6",
  borderRadius: "24px",
  transition: "all 0.3s ease",
};
const projectImageWrapperStyle = {
  height: "180px",
  borderRadius: "16px",
  overflow: "hidden",
  backgroundColor: "#f3f4f6",
};
const projectImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
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
  color: "#6b7280",
};
const statusDotStyle = { width: "8px", height: "8px", borderRadius: "50%" };
const projectTitleStyle = {
  fontSize: "24px",
  fontWeight: 700,
  color: "#0b1020",
  margin: "12px 0 8px 0",
};
const projectDescStyle = {
  fontSize: "16px",
  color: "#6b7280",
  lineHeight: 1.6,
  marginBottom: "16px",
};
const projectActionStyle = {
  fontSize: "16px",
  fontWeight: 600,
  color: "#7c3aed",
};
