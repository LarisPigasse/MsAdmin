import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Benvenuti</h3>
                <p>Inserisci le tue credenziali per accedere</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
