// Authentication Service using SessionStorage
class AuthService {
    // Store user credentials during signup
    static storeUserCredentials(userData) {
        const userCredentials = {
            fullName: userData.fullName,
            email: userData.email,
            company: userData.company,
            password: userData.password, // In production, this should be hashed
            createdAt: new Date().toISOString()
        };

        sessionStorage.setItem('userCredentials', JSON.stringify(userCredentials));
        return userCredentials;
    }

    // Get stored user credentials
    static getUserCredentials() {
        const credentials = sessionStorage.getItem('userCredentials');
        return credentials ? JSON.parse(credentials) : null;
    }

    // Validate login credentials
    static validateLogin(email, password) {
        const storedCredentials = this.getUserCredentials();

        if (!storedCredentials) {
            return {
                isValid: false,
                error: 'No account found. Please sign up first.'
            };
        }

        if (email !== storedCredentials.email) {
            return {
                isValid: false,
                error: 'Email address not found. Please check your email or sign up.',
                field: 'email'
            };
        }

        if (password !== storedCredentials.password) {
            return {
                isValid: false,
                error: 'Incorrect password. Please try again.',
                field: 'password'
            };
        }

        return {
            isValid: true,
            user: storedCredentials
        };
    }

    // Create login session
    static createLoginSession(userCredentials) {
        const loginSession = {
            isLoggedIn: true,
            user: {
                fullName: userCredentials.fullName,
                email: userCredentials.email,
                company: userCredentials.company
            },
            loginTime: new Date().toISOString()
        };

        sessionStorage.setItem('loginSession', JSON.stringify(loginSession));
        return loginSession;
    }

    // Get current login session
    static getLoginSession() {
        const session = sessionStorage.getItem('loginSession');
        return session ? JSON.parse(session) : null;
    }

    // Check if user is logged in
    static isLoggedIn() {
        const session = this.getLoginSession();
        return session && session.isLoggedIn;
    }

    // Logout user
    static logout() {
        sessionStorage.removeItem('loginSession');
    }

    // Clear all stored data (useful for testing or account deletion)
    static clearAllData() {
        sessionStorage.removeItem('userCredentials');
        sessionStorage.removeItem('loginSession');
    }

    // Get current logged in user
    static getCurrentUser() {
        const session = this.getLoginSession();
        return session ? session.user : null;
    }
}

export default AuthService;
