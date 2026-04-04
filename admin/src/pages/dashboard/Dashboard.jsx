import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../../components/ui/StatCard";
import { UnreadDot } from "../../components/ui/Badge";
import { getMessages } from "../../services/messageService";
import { getProjects } from "../../services/projectService";
import { getResume } from "../../services/resumeService";
import { getSkills } from "../../services/skillService";
import { formatDate, truncate } from "../../utils/helper";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    messages: 0,
    unread: 0,
    resume: 0,
  });
  const [msgs, setMsgs] = useState([]);
  const [projs, setProjs] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    Promise.allSettled([
      getProjects(),
      getSkills(),
      getMessages(),
      getResume(),
    ]).then((results) => {
      if (!mounted) return;
      const projects =
        results[0].status === "fulfilled" ? results[0].value : [];
      const skills = results[1].status === "fulfilled" ? results[1].value : [];
      const messages =
        results[2].status === "fulfilled" ? results[2].value : [];
      const resume =
        results[3].status === "fulfilled" ? results[3].value : null;
      setStats({
        projects: projects.length,
        skills: skills.length,
        messages: messages.length,
        unread: messages.filter((item) => !item.read).length,
        resume: resume ? 1 : 0,
      });
      setMsgs(messages.slice(0, 4));
      setProjs(projects.slice(0, 3));
      setReady(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const cards = [
    {
      label: "Total Projects",
      value: stats.projects,
      icon: "Projects",
      accent: "#6366f1",
    },
    {
      label: "Total Skills",
      value: stats.skills,
      icon: "Skills",
      accent: "#a78bfa",
    },
    {
      label: "Messages",
      value: stats.messages,
      icon: "Inbox",
      accent: "#22c55e",
    },
    {
      label: "Active Resume",
      value: stats.resume,
      icon: "Resume",
      accent: "#14b8a6",
    },
    {
      label: "Unread",
      value: stats.unread,
      icon: "Unread",
      accent: "#f59e0b",
      sub: "Need attention",
    },
  ];

  const quickActions = [
    { label: "+ Add Project", to: "/projects/add", accent: "#6366f1" },
    { label: "+ Add Skill", to: "/skills/add", accent: "#a78bfa" },
    { label: "Manage Resume", to: "/resume", accent: "#14b8a6" },
    { label: "View Messages", to: "/messages", accent: "#22c55e" },
  ];

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
      className="animate-fade-up"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
          gap: "1rem",
        }}
        className="dashboard-stats-grid"
      >
        {cards.map((card, index) => (
          <div key={card.label} style={{ animationDelay: `${index * 0.07}s` }}>
            <StatCard {...card} />
          </div>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 320px",
          gap: "1.5rem",
        }}
        className="dashboard-main-grid"
      >
        <div className="glass" style={{ padding: "1.25rem", minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.75rem",
              marginBottom: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            <h3
              style={{ fontWeight: 700, fontSize: "0.95rem", color: "#f4f4f5" }}
            >
              Recent Messages
            </h3>
            <button
              onClick={() => navigate("/messages")}
              style={{
                fontSize: "0.75rem",
                color: "#6366f1",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              View all {"->"}
            </button>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {!ready ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="skeleton"
                  style={{ height: 56, borderRadius: 10 }}
                />
              ))
            ) : msgs.length === 0 ? (
              <p
                style={{
                  color: "#52525b",
                  fontSize: "0.85rem",
                  textAlign: "center",
                  padding: "2rem",
                }}
              >
                No messages yet.
              </p>
            ) : (
              msgs.map((message) => (
                <div
                  key={message.id}
                  onClick={() => navigate("/messages")}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.875rem",
                    padding: "0.875rem",
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    cursor: "pointer",
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 9,
                      flexShrink: 0,
                      background: "linear-gradient(135deg,#6366f1,#a78bfa)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      color: "white",
                    }}
                  >
                    {message.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.2rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#e4e4e7",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {message.name}
                      </span>
                      {!message.read && <UnreadDot />}
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "#52525b",
                          marginLeft: "auto",
                          flexShrink: 0,
                        }}
                      >
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.78rem", color: "#71717a" }}>
                      {truncate(message.message, 70)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            minWidth: 0,
          }}
        >
          <div className="glass" style={{ padding: "1.25rem" }}>
            <h3
              style={{
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "#f4f4f5",
                marginBottom: "1rem",
              }}
            >
              Quick Actions
            </h3>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              {quickActions.map((action) => (
                <button
                  key={action.to}
                  onClick={() => navigate(action.to)}
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: 9,
                    border: `1px solid ${action.accent}25`,
                    background: `${action.accent}0f`,
                    color: action.accent,
                    cursor: "pointer",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    textAlign: "left",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
          <div className="glass" style={{ padding: "1.25rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
                flexWrap: "wrap",
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: "#f4f4f5",
                }}
              >
                Recent Projects
              </h3>
              <button
                onClick={() => navigate("/projects")}
                style={{
                  fontSize: "0.7rem",
                  color: "#6366f1",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                View all {"->"}
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              {!ready
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="skeleton"
                      style={{ height: 40, borderRadius: 8 }}
                    />
                  ))
                : projs.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => navigate("/projects")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        padding: "0.55rem 0.75rem",
                        borderRadius: 8,
                        background: "rgba(255,255,255,0.03)",
                        cursor: "pointer",
                        minWidth: 0,
                      }}
                    >
                      <span style={{ fontSize: "1rem" }}>Item</span>
                      <div style={{ minWidth: 0 }}>
                        <p
                          style={{
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            color: "#e4e4e7",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {project.title}
                        </p>
                        <p style={{ fontSize: "0.68rem", color: "#52525b" }}>
                          {formatDate(project.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
