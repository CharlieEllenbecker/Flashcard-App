class Auth {    // useContext instead to store a user?... or should there just be an auth class?
    constructor() {
        this.authenticated = false;
    }

    register() { // callback needed?
        this.authenticated = true;
    }

    login() {
        this.authenticated = true;
    }

    logout() {
        this.authenticated = false;
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();