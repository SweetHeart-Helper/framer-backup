// src/App.tsx
import ProfileHeader from "./components/ProfileHeader";
import { ProjectList } from "./components/ProjectComponents";
import { TechStackList } from "./components/TechStackList";
import { LinkButtons } from "./components/LinkButtons";
function App() {
  const name = "사용자 이름";
  const tagline = "Next.js와 Framer로 템플릿을 만드는 제작자입니다.";
  const badgeText = "Available for Projects";
  const profileImage =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000";
  const theme = {
    bg: "#ffffff",
    text: "#1d1d1f",
    card: "#f5f5f7",
    border: "#e5e5e5",
  };
  const accentColor = "#007AFF";

  const mockTechStacks = [
    {
      stackName: "React",
      stackIcon:
        "https://framerusercontent.com/images/PWJ4uJbS6aO7zIuK7f2A3A.png",
    },
    {
      stackName: "TypeScript",
      stackIcon:
        "https://framerusercontent.com/images/9v76Y9nZ8aO7zIuK7f2A3A.png",
    },
    {
      stackName: "Framer",
      stackIcon:
        "https://framerusercontent.com/images/R9v76Y9nZ8aO7zIuK7f2A3A.png",
    },
  ];

  const mockProjects = [
    {
      title: "이사 성공!",
      status: "Active",
      desc: "부품들이 조립되고 있습니다.",
      accent: accentColor,
    },
  ];
  const myLinks = [
    {
      title: "Instagram",
      url: "https://instagram.com",
      linkIcon: "https://cdn.worldvectorlogo.com/logos/instagram-2016.svg",
      isCleared: false,
    },
    {
      title: "LinkedIn",
      url: "https://linkedin.com",
      linkIcon: "https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg",
      isCleared: false,
    },
  ];

  return (
    <div
      style={{
        backgroundColor: theme.bg,
        minHeight: "100vh",
        padding: "60px 20px",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* 1. 헤더 */}
        <ProfileHeader
          name={name}
          tagline={tagline}
          badgeText={badgeText}
          profileImage={profileImage}
          theme={theme}
          accentColor={accentColor}
        />

        {/* 2. 기술 스택 - 여기서 사용하면 경고가 사라집니다! */}
        <TechStackList
          techStacks={mockTechStacks}
          theme={theme}
          isDark={false}
        />

        <div style={{ height: "40px" }} />

        {/* 3. 프로젝트 리스트 */}
        <ProjectList
          projects={mockProjects}
          theme={theme}
          accentColor={accentColor}
        />
        <LinkButtons links={myLinks} theme={theme} accentColor={accentColor} />
      </div>
    </div>
  );
}

export default App;
