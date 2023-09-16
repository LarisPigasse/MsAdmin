export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = {
    utente: {
        token: string
        email: string
        account: string
        authority: string[]
        avatar: string
    }
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
