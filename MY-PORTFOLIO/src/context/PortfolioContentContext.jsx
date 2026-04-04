/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { portfolioApi } from "../services/api";

const DEFAULT_CONTENT = {
  brandName: "",
  heroOutlineTitle: "",
  heroScriptTitle: "",
  heroDescription: "",
  heroImage: "",
  aboutLabel: "",
  aboutOutlineTitle: "",
  aboutScriptTitle: "",
  aboutHeading: "",
  aboutDescription: "",
  contactHeading: "",
  contactSubheading: "",
  contactEmail: "",
  location: "",
  githubUrl: "",
  linkedinUrl: "",
  education: [],
  experience: [],
  personalSkills: [],
  marqueeItems: [],
};

const PortfolioContentContext = createContext({
  content: DEFAULT_CONTENT,
  loading: true,
  error: "",
});

export const PortfolioContentProvider = ({ children }) => {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    portfolioApi
      .getContent()
      .then((data) => {
        if (!mounted) return;
        setContent({ ...DEFAULT_CONTENT, ...(data || {}) });
        setError("");
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || "Failed to load portfolio content");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({ content, loading, error }),
    [content, loading, error],
  );

  return (
    <PortfolioContentContext.Provider value={value}>
      {children}
    </PortfolioContentContext.Provider>
  );
};

export const usePortfolioContent = () => useContext(PortfolioContentContext);
