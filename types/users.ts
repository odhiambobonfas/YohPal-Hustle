export interface Profile {
    userName : string
    intials : string
    location : string
    email : string
    phone : string
    avatar : File
}

export interface UpdateProfile {
    // location : string
    email : string
    phone : string
}