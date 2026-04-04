import { NavLink, useNavigate } from "react-router-dom";
import {
  RiCodeLine,
  RiDashboardLine,
  RiFilePaper2Line,
  RiFolderOpenLine,
  RiGalleryLine,
  RiLogoutBoxLine,
  RiMessage2Line,
  RiSettings4Line,
  RiShieldLine,
} from "react-icons/ri";
import { useAuth } from "../../hooks/useAuth";

const NAV = [
  { to: "/", label: "Dashboard", icon: RiDashboardLine, end: true },
  { to: "/projects", label: "Projects", icon: RiFolderOpenLine },
  { to: "/skills", label: "Skills", icon: RiCodeLine },
  { to: "/certificates", label: "Certificates", icon: RiGalleryLine },
  { to: "/resume", label: "Resume", icon: RiFilePaper2Line },
  { to: "/messages", label: "Messages", icon: RiMessage2Line },
  { to: "/settings", label: "Settings", icon: RiSettings4Line },
];

const Sidebar = ({ isOpen = false, onClose }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const initials = (user?.name || "A").slice(0, 2).toUpperCase();

  const handleLogout = () => {
    logout();
    navigate("/login");
    onClose?.();
  };

  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <div
        style={{
          padding: "1.5rem 1.25rem",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: "linear-gradient(135deg, #6366f1, #a78bfa)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(99,102,241,0.45)",
              flexShrink: 0,
            }}
          >
            <RiShieldLine size={22} color="white" />
          </div>
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "0.95rem",
                color: "#f4f4f5",
                lineHeight: 1.2,
              }}
            >
              Portfolio
            </div>
            <div
              style={{
                fontSize: "0.7rem",
                color: "#52525b",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Admin Panel
            </div>
          </div>
        </div>
      </div>

      <nav
        style={{
          flex: 1,
          padding: "1rem 0.875rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.2rem",
          overflowY: "auto",
        }}
      >
        {NAV.map((item) => {
          const NavIcon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.7rem 0.875rem",
                borderRadius: 10,
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 500,
                transition: "all 0.2s ease",
                background: isActive ? "rgba(99,102,241,0.15)" : "transparent",
                color: isActive ? "#818cf8" : "#71717a",
                border: isActive
                  ? "1px solid rgba(99,102,241,0.25)"
                  : "1px solid transparent",
                boxShadow: isActive ? "0 0 12px rgba(99,102,241,0.1)" : "none",
              })}
            >
              <NavIcon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div
        style={{
          padding: "1rem 0.875rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem",
            borderRadius: 10,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            marginBottom: "0.75rem",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: "linear-gradient(135deg, #6366f1, #a78bfa)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "white",
              flexShrink: 0,
            }}
          >
            {initials}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#f4f4f5",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user?.name || "Admin"}
            </div>
            <div
              style={{
                fontSize: "0.68rem",
                color: "#52525b",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user?.email || "admin@portfolio.dev"}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            width: "100%",
            padding: "0.7rem 0.875rem",
            borderRadius: 10,
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "#ef4444",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: 500,
            transition: "all 0.2s ease",
          }}
        >
          <RiLogoutBoxLine size={17} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
