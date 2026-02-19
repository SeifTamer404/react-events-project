import { redirect } from "react-router";

export function getTokenDuration(){
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function getAuthToken(){
    const token = localStorage.getItem('token');
    const duration = getTokenDuration();
    if(!token){
        return null;
    }
    if(duration < 0){
        console.log(duration);
        return 'EXPIRED';
    }
    return token;
}

export function tokenLoader(){
    return getAuthToken();
}

export function checkAuthLoader(){
    const token = getAuthToken();
    if(!token){
        return redirect('/auth?mode=login');
    }
    return null;
}

