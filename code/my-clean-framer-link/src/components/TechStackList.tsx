import React from "react";

// 1. Props 타입 정의
export interface TechStackItem {
  stackName?: string;
  stackIcon?: string;
  isCleared?: boolean;
}

export interface TechStackTheme {
  bg: string;
  text: string;
  card: string;
  border: string;
}

export interface TechStackListProps {
  techStacks: TechStackItem[];
  theme: TechStackTheme;
  isDark?: boolean; // 칩의 배경색/테두리색 반전 처리를 위해 유지
}

// 2. 메인 컴포넌트 Export
export function TechStackList({
  techStacks,
  theme,
  isDark,
}: TechStackListProps) {
  // 데이터가 없으면 렌더링하지 않음
  if (!techStacks || techStacks.length === 0) return null;

  return (
    <div style={stackContainerStyle}>
      {techStacks.map((item, index) => {
        // 아이템이 비어있거나, cleared 상태거나, 이름과 아이콘이 모두 없으면 무시 [cite: 29]
        if (!item || item.isCleared || (!item.stackName && !item.stackIcon)) {
          return null;
        }

        return (
          <div
            key={index}
            style={{
              ...stackItemStyle,
              // 원본 코드의 테마 및 반전 로직 적용 [cite: 30, 31]
              backgroundColor: isDark ? "#F5F5F7" : theme.card, // 원본의 #FFFFFF 대신 테마 카드 색상 사용
              borderColor: isDark ? "#E5E5E5" : theme.border,
              color: "#1d1d1f",
            }}
          >
            {item.stackIcon && (
              <img
                src={item.stackIcon}
                style={stackIconStyle}
                alt={item.stackName || "Tech Icon"}
              />
            )}
            <span style={{ fontWeight: 600 }}>{item.stackName || ""}</span>
          </div>
        );
      })}
    </div>
  );
}

// 3. 스타일 정의 (파일 하단으로 분리)

const stackContainerStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap", // 가로 스크롤(nowrap) 대신 자연스러운 줄바꿈 적용
  justifyContent: "center",
  gap: "8px", // 간격 유지
  marginBottom: "56px",
  width: "100%",
};

const stackItemStyle: React.CSSProperties = {
  padding: "10px 14px", // 안쪽 여백 [cite: 159]
  border: "1px solid",
  borderRadius: "16px",
  fontSize: "13px",
  fontWeight: 500,
  whiteSpace: "nowrap", // 글자 줄바꿈 방지 [cite: 159]

  // 기존 JSX 인라인에 있던 스타일 통합 [cite: 31, 32]
  display: "flex",
  alignItems: "center",
  gap: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
};

const stackIconStyle: React.CSSProperties = {
  width: "16px",
  height: "16px",
  objectFit: "contain", // 아이콘 비율 유지 [cite: 33, 34]
};
