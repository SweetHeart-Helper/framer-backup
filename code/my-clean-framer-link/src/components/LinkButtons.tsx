import * as React from "react";
1;

export interface LinkItem {
  title?: string;
  subtitle?: string;
  linkIcon?: string;
  url?: string;
  isCleared?: boolean;
}

export interface ThemeColors {
  bg: string;
  text: string;
  card: string;
  border: string;
}

export interface LinkButtonsProps {
  links: LinkItem[];
  theme: ThemeColors;
  accentColor: string;
}

export function LinkButtons({ links, theme, accentColor }: LinkButtonsProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const activeLinks = links?.filter((link) => link && !link.isCleared) || [];

  if (activeLinks.length === 0) return null;

  return (
    <div style={containerStyle}>
      <h2 style={{ ...headingStyle, color: theme.text }}>Links</h2>

      <div style={linkListStyle}>
        {activeLinks.map((link, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <a
              key={index}
              href={link.url || "#"}
              target="_blank"
              rel="noreferrer"
              style={linkAnchorStyle}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                style={{
                  ...buttonCardStyle,
                  backgroundColor: theme.card,
                  borderColor: isHovered ? accentColor : theme.border,
                  boxShadow: isHovered ? `0 4px 12px ${accentColor}20` : "none",
                }}
              >
                <div style={contentWrapperStyle}>
                  {" "}
                  {link.linkIcon && (
                    <img src={link.linkIcon} style={iconStyle} alt="" />
                  )}
                  <span
                    style={{
                      ...titleTextStyle,
                      color: theme.text,
                    }}
                  >
                    {link.title || "Link"}
                  </span>
                </div>

                <span style={{ color: theme.text, opacity: 0.5 }}>↗</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "768px",
  margin: "0 auto",
  padding: "0 20px",
  boxSizing: "border-box",
};

const headingStyle: React.CSSProperties = {
  fontSize: "clamp(24px, 5vw, 30px)",
  fontWeight: 700,
  marginBottom: "24px",
};

const linkListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "16px",
  marginTop: "20px",
  marginBottom: "40px",
};

const linkAnchorStyle: React.CSSProperties = {
  width: "calc(33.33% - 12px)",
  minWidth: "120px",
  textDecoration: "none",
};

const buttonCardStyle: React.CSSProperties = {
  border: "1px solid",
  borderRadius: "16px",
  padding: "14px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  transition: "all 0.2s ease-in-out",
  cursor: "pointer",
};

const contentWrapperStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const iconStyle: React.CSSProperties = {
  width: "40px",
  height: "40px",
  objectFit: "contain",
};

const titleTextStyle: React.CSSProperties = {
  fontSize: "clamp(14px, 3.5vw, 16px)",
  fontWeight: 600,
};
