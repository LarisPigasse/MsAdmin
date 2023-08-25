import SignUpForm from './SignUpForm'

const SignUp = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Accedi</h3>
                <p>E iniziamo con la prova gratuita</p>
            </div>
            <SignUpForm disableSubmit={false} />
        </>
    )
}

export default SignUp
