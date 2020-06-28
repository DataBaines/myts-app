export function authHeader() {
    // return authorization header with basic auth credentials
    let strUser: string = localStorage.getItem('user') || ''
    let user = JSON.parse(strUser);

    if (user && user.authdata) {
        return { 'Authorization': 'Basic ' + user.authdata };
    } else {
        return { 'Authorization': ''};
    }
}
