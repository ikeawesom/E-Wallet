export default function Nav_Bar(props: any) {
    return (
        <div>
            <h1>Hello {localStorage.getItem('Login_Username')}!</h1> <br />

            <button onClick={props.Logout}>Logout</button>
        </div>
    )
}