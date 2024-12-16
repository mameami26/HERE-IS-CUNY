import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (!token) return null; // Check if token exists before decoding
    try {
      return decode(token);
    } catch (err) {
      console.error('Error decoding token:', err); // Error logging
      return null;
    }
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // Check token existence and validity
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000; // Check if token has expired
    } catch (err) {
      console.error('Token decoding failed:', err); // Log the error
      return false; // Treat as valid if decoding fails (optional handling)
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken, redirectUrl = '/Home') {
    localStorage.setItem('id_token', idToken); // Consider using sessionStorage for better security in some cases
    window.location.assign(redirectUrl); // Allow dynamic redirection
  }

  logout(redirectUrl = '../pages/WelcomePage.jsx') {
    localStorage.removeItem('id_token');
    window.location.assign(redirectUrl);
  }
}

export default new AuthService();
