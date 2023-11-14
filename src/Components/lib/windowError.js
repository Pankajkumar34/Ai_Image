"use client"
export const windowError = () => {

    if (typeof window !== 'undefined') {
        return true
    } else {
        return false
    }
}

export const getLocalStroage = () => {
    if (typeof window !== 'undefined') {
        const userData =JSON.parse(window.localStorage.getItem("userData"));
        let email = userData && userData.hasOwnProperty('email') ? userData.email : null;
       return email
    } else {
        return false
    }
}
export const removeLocalStroage = () => {
    if (typeof window !== 'undefined') {
       window.localStorage.removeItem("userData");
        window.localStorage.removeItem("userToken");
     return true
    } else {
        return false
    }
}
