import { useState } from "react"
import Main from "../components/layout/Main"
import Logo from "../components/layout/Logo"

function SignIn(){
    return(
        <div className="page">
            <Logo/>
            <Main>
                <h1 style={{marginBottom: '50px'}}>Sign In</h1>
                <LoginForm></LoginForm>
            </Main>
        </div>
    )
}

export default SignIn

function LoginForm() {
    return (
      <form>
        <div>
          <label htmlFor="email"></label>
          <input type="email" id="email" name="email" placeholder="Seu email" />
        </div>
  
        <div>
          <label htmlFor="senha"></label>
          <input type="password" id="senha" name="senha" placeholder="Sua senha" />
        </div>
        
        <CheckboxExample></CheckboxExample>

        <button type="submit">Entrar</button>
        
      </form>
    );
  }
  
  function CheckboxExample() {
    const [isChecked, setIsChecked] = useState(false);
  
    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
    };
  
    return (
      <div>
        <label>
          <input className="checkbox"
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          Manter conectado
        </label>
      </div>
    );
  }