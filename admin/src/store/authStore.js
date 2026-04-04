const TOKEN_KEY = 'admin_token';
const USER_KEY  = 'admin_user';

const DEFAULT_USER = {
  name:  'Admin',
  email: 'admin@portfolio.dev',
  avatar: '',
};

export const authStore = {
  login(token, user = DEFAULT_USER) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser() {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  },

  updateUser(data) {
    const current = this.getUser();
    localStorage.setItem(USER_KEY, JSON.stringify({ ...current, ...data }));
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};
