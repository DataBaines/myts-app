export function authHeader() {
    // return authorization header with basic auth credentials
    let strUser: string = localStorage.getItem('user') || ''
    let user = {authdata: ''} 
    
    try {
        user = JSON.parse(strUser);
    } catch (e) { }

    //console.log('Stored Authorisation: ' + JSON.stringify(user))

    if (user && user.authdata) {
        return { 'Authorization': 'Basic ' + user.authdata };
    } else {
        return { 'Authorization': ''};
    }
}

export function isLoggedIn() {
    let strAuth = authHeader()
    return ! (strAuth.Authorization === '') 
}
