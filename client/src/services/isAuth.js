export default function isAuth() {
    const token = localStorage.getItem('x-auth-token');
    return token !== null;
}