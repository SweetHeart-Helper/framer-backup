import * as React from "react";
1;

// 1. Props 인터페이스 정의
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

// 2. 컴포넌트 내보내기 (Vite 호환)
export function LinkButtons({ links, theme, accentColor }: LinkButtonsProps) {
  // 개별 버튼의 호버 상태를 관리하기 위한 상태값
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  // isCleared가 true이거나 비어있는 링크 필터링 [cite: 61]
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
                      color: theme.text, // 텍스트 색상을 테마와 연동
                    }}
                  >
                    {link.title || "Link"}
                  </span>
                </div>
                {/* 화살표 아이콘 [cite: 74] */}
                <span style={{ color: theme.text, opacity: 0.5 }}>↗</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

// 3. 스타일 가이드 (React.CSSProperties)
const containerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "768px", // 모바일/태블릿 화면 최대 너비 제한
  margin: "0 auto",
  padding: "0 20px", // 양옆 여백 확보
  boxSizing: "border-box",
};

const headingStyle: React.CSSProperties = {
  fontSize: "clamp(24px, 5vw, 30px)", // 화면 크기에 따라 24px ~ 30px 사이로 유연하게 조절
  fontWeight: 700,
  marginBottom: "24px",
};

const linkListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row", // 가로로 나열
  flexWrap: "wrap", // 자리가 부족하면 다음 줄로 넘김
  justifyContent: "center", // 가운데 정렬
  gap: "16px", // 버튼 사이 간격
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
  fontSize: "clamp(14px, 3.5vw, 16px)", // 모바일에서 너무 커지지 않게 글꼴 크기 제어
  fontWeight: 600,
};
