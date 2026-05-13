import * as React from "react";

interface StayInTouchProps {
  isVisible: boolean;
  subscribeData: Array<{
    title: string;
    desc: string;
    placeholder?: string;
  }>;
  theme: {
    bg: string;
    text: string;
    card: string;
    border: string;
  };
  isDark: boolean;
  accentColor: string;
  formAction: string;
  calendarUrl?: string;
}

export default function StayInTouch({
  isVisible,
  subscribeData,
  theme,
  isDark,
  accentColor,
  formAction,
  calendarUrl = "https://calendly.com/",
}: StayInTouchProps) {
  const [email, setEmail] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [nameInput, setNameInput] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const handleSubscribe = async () => {
    if (!formAction || formAction === "https://" || formAction.trim() === "") {
      setSuccessMessage("⚠️ Please enter your Formspree URL in the sidebar.");
      return;
    }

    try {
      const response = await fetch(formAction, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: nameInput,
          email: email,
          message: message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setNameInput("");
        setEmail("");
        setMessage("");
        setSuccessMessage("");
      } else {
        setSuccessMessage("⚠️ Failed to send. Please check your URL settings.");
      }
    } catch (error: any) {
      setSuccessMessage("⚠️ Network error. Please try again later.");
    }
  };

  if (!isVisible || !subscribeData?.[0]) return null;

  return (
    <>
      <div
        id="subscribe-card-wrapper"
        style={{
          marginTop: "40px",
          padding: "40px",
          borderRadius: "32px",
          backgroundColor: isDark ? "#111" : "#FFFFFF",
          border: `1px solid ${theme.border}`,
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "100%",
          boxSizing: "border-box",
          boxShadow: isDark ? "none" : "0 10px 30px rgba(0,0,0,0.03)",
        }}
      >
        <div id="subscribe-text-area">
          <h3
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: theme.text,
              margin: "0 0 8px 0",
            }}
          >
            {subscribeData[0].title}
          </h3>
          <p
            style={{
              fontSize: "15px",
              color: theme.text,
              opacity: 0.6,
              margin: 0,
            }}
          >
            {subscribeData[0].desc}
          </p>
        </div>

        <div
          onClick={() => setIsModalOpen(true)}
          style={{
            height: "52px",
            borderRadius: "14px",
            border: `1px solid ${isDark ? "#E5E7EB" : "#333333"}`,
            padding: "0 18px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            background: isDark ? "#FFFFFF" : "#F2F2F7",
            color: isDark ? "#000000" : "#757575",
            fontSize: "15px",
            transition: "all 0.1s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "scale(1)";
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {subscribeData[0].placeholder || "Enter your email"}
        </div>
      </div>

      {isModalOpen && (
        <div style={modalOverlayStyle} onClick={() => setIsModalOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              ...modalContentStyle,
              backgroundColor: isDark ? "#000000" : "#FFFFFF",
              border: `1px solid ${isDark ? "#333333" : "#E5E5E5"}`,
            }}
          >
            {!isSubmitted ? (
              <>
                <input
                  placeholder="Name"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  style={modalInputStyle}
                />
                <input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={modalInputStyle}
                />
                <textarea
                  placeholder="Message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    ...modalInputStyle,
                    height: "auto",
                    padding: "16px",
                  }}
                />
                <button
                  onClick={handleSubscribe}
                  style={{
                    ...primaryButtonStyle,
                    background: accentColor,
                  }}
                  onMouseDown={(e) =>
                    (e.currentTarget.style.transform = "scale(0.96)")
                  }
                  onMouseUp={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  Send Message
                </button>
                {successMessage && (
                  <p style={{ color: accentColor, textAlign: "center" }}>
                    {successMessage}
                  </p>
                )}
              </>
            ) : (
              <div style={successContainerStyle}>
                <h3 style={{ color: theme.text, margin: 0 }}>
                  Message Received! ☕
                </h3>
                <p style={{ color: theme.text, opacity: 0.7, margin: 0 }}>
                  Thank you for reaching out.
                  <br />
                  Would you like to schedule a quick call?
                </p>
                <a
                  href={calendarUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    ...primaryButtonStyle,
                    background: accentColor,
                    textDecoration: "none",
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseDown={(e) =>
                    (e.currentTarget.style.transform = "scale(0.96)")
                  }
                  onMouseUp={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  Book a Coffee Chat →
                </a>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsSubmitted(false);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: theme.text,
                    opacity: 0.5,
                    cursor: "pointer",
                    transition: "transform 0.1s ease",
                  }}
                  onMouseDown={(e) =>
                    (e.currentTarget.style.transform = "scale(0.95)")
                  }
                  onMouseUp={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  Not now, close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const modalOverlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.8)",
  backdropFilter: "blur(5px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  width: "90%",
  maxWidth: "420px",
  padding: "40px",
  borderRadius: "32px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
};

const modalInputStyle: React.CSSProperties = {
  width: "100%",
  height: "50px",
  borderRadius: "14px",
  border: "1px solid #E5E5E5",
  padding: "0 16px",
  fontSize: "15px",
  color: "#000000",
  outline: "none",
  boxSizing: "border-box",
};

const primaryButtonStyle: React.CSSProperties = {
  height: "58px",
  borderRadius: "18px",
  fontWeight: 700,
  border: "none",
  cursor: "pointer",
  transition: "transform 0.1s ease",
};

const successContainerStyle: React.CSSProperties = {
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};
