export function validatePassword(password:string):string{

    if(password.length === 0){
        return ""
    }
    if(password.length<8){
        return "Must be at least 8 characters"
    } 
    if(!/[0-9]/.test(password)){
        return "Must include at leaset one number"
    }
    if(!/[A-Z]/.test(password)){
        return "Must contain at least one uppercase letter"
    }
    if(!/[a-z]/.test(password)){
        return "Must contain at least one lowercase letter"
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)){
        return "Must contain at least one special character"
    }

    return ""
}

