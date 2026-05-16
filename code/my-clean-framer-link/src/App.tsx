// src/App.tsx

import ProfileHeader from "./components/ProfileHeader";
import { TechStackList } from "./components/TechStackList";
import { LinkButtons } from "./components/LinkButtons";
import StayInTouch from "./components/StayInTouch";

function App(props: any) {
  const {
    name = "Assembler",
    tagline = "Building simple tools that solve real problems.",
    badgeText = "Available for Projects",
    profileImage,
    accentColor = "#007AFF",
    themeMode = "Light",
    isVisible = true,
    subscribeData = [{ title: "Stay in Touch", desc: "Let's connect!" }],
    formAction = "",
    calendarUrl = "https://calendly.com/",
    useCustomColors = false,
    customBg = "#ffffff",
    customText = "#1d1d1f",
    customCard = "#f5f5f7",
    customBorder = "#e5e5e5",
    userStacks = [],
    cmsProjects,
    showLinkSettings = true,
    userLinks = [],
  } = props;

  const displayImage =
    profileImage &&
    typeof profileImage === "string" &&
    profileImage.trim() !== ""
      ? profileImage
      : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256";

  const isDark = themeMode === "Dark";

  const theme = {
    bg: useCustomColors ? customBg : isDark ? "#0D0D0D" : "#FFFFFF",
    text: useCustomColors ? customText : isDark ? "#FFFFFF" : "#1D1D1F",
    card: useCustomColors ? customCard : isDark ? "#1A1A1A" : "#F5F5F7",
    border: useCustomColors ? customBorder : isDark ? "#262626" : "#E5E5E5",
  };

  return (
    <div
      style={{
        backgroundColor: theme.bg,
        minHeight: "100vh",
        padding: "60px 20px",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <ProfileHeader
          name={name}
          tagline={tagline}
          badgeText={badgeText}
          theme={theme}
          accentColor={accentColor}
          profileImage={displayImage}
        />

        <TechStackList techStacks={userStacks} theme={theme} isDark={isDark} />

        <div style={{ height: "40px" }} />

        <div style={{ width: "100%" }}>
          {cmsProjects ? (
            cmsProjects
          ) : (
            <div
              style={{ textAlign: "center", padding: "20px", color: "gray" }}
            >
              Connect CMS Collection in the right panel.
            </div>
          )}
        </div>

        {showLinkSettings && userLinks && userLinks.length > 0 && (
          <div style={{ marginTop: "40px", marginBottom: "40px" }}>
            <LinkButtons
              links={userLinks}
              theme={theme}
              accentColor={accentColor}
            />
          </div>
        )}

        <div style={{ marginTop: "60px" }}>
          {isVisible && (
            <StayInTouch
              isVisible={isVisible}
              subscribeData={subscribeData}
              formAction={formAction}
              calendarUrl={calendarUrl}
              isDark={isDark}
              theme={theme}
              accentColor={accentColor}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
