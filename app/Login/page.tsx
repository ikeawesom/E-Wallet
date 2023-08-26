'use client'

export default function Page() {
  function OnLogin(event: any) {
    event.preventDefault();

    const Username = event.target[0].value
    const Password = event.target[1].value
    const is_Verified = Verify_User(Username, Password)
    if (is_Verified) {
      localStorage.setItem('Login_Username', Username)
      window.location.href = '/';
    } else if (!is_Verified) {
      console.log('wrong login details!')
      //will create proper error messages later in the future
    }
  }

  function Verify_User(Username: string, Password: string) {
    //API call to backend to verify user's login details
    //returns true always for now since backend isnt developed yet

    return true
  }

  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={OnLogin}>
        <input type='text' /> <br />
        <input type='text' /> <br />

        <input type='submit' />
      </form>
    </div>
  );
}
