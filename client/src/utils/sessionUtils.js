// Session management utilities
export const sessionUtils = {
  // Check if session is likely expired based on last activity
  isSessionExpired: () => {
    const lastActivity = localStorage.getItem('lastActivity');
    if (!lastActivity) return false;
    
    const now = Date.now();
    const lastActivityTime = parseInt(lastActivity);
    const sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours
    
    return (now - lastActivityTime) > sessionTimeout;
  },

  // Update last activity timestamp
  updateLastActivity: () => {
    localStorage.setItem('lastActivity', Date.now().toString());
  },

  // Clear session data
  clearSession: () => {
    localStorage.removeItem('lastActivity');
    localStorage.removeItem('user');
    sessionStorage.clear();
  },

  // Initialize session tracking
  initSessionTracking: () => {
    // Update activity on user interactions
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const updateActivity = () => {
      sessionUtils.updateLastActivity();
    };

    events.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });

    // Initial activity update
    sessionUtils.updateLastActivity();

    // Return cleanup function
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity);
      });
    };
  }
};