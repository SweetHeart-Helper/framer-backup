import React from "react";

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
  isDark?: boolean;
}

export function TechStackList({
  techStacks,
  theme,
  isDark,
}: TechStackListProps) {
  if (!techStacks || techStacks.length === 0) return null;

  return (
    <div style={stackContainerStyle}>
      {techStacks.map((item, index) => {
        if (!item || item.isCleared || (!item.stackName && !item.stackIcon)) {
          return null;
        }

        return (
          <div
            key={index}
            style={{
              ...stackItemStyle,

              backgroundColor: isDark ? "#F5F5F7" : theme.card,
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

const stackContainerStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "8px",
  marginBottom: "56px",
  width: "100%",
};

const stackItemStyle: React.CSSProperties = {
  padding: "10px 14px",
  border: "1px solid",
  borderRadius: "16px",
  fontSize: "13px",
  fontWeight: 500,
  whiteSpace: "nowrap",

  display: "flex",
  alignItems: "center",
  gap: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
};

const stackIconStyle: React.CSSProperties = {
  width: "16px",
  height: "16px",
  objectFit: "contain",
};
