import brand_logo from "../../../../images/Brand_logo.png";
import "./Login_Nav.css";

function LoginNav() {

    return (
        <nav className="Login_navbar navbar navbar-expand-lg sticky-top mb-5">
            <div className="container-fluid">
                <a className="navbar-brand me-auto col-md-2" href="/">
                    <img
                        src={brand_logo}
                        className="d-block"
                        alt="Klupea logo"
                    />
                </a> 
                <div className="ms-auto fw-bold" style={{fontFamily:"'Montserrat', sans-serif"}}>
                
                    <a href="/signIn" className="text-dark">LOGIN</a>
                    <a href="/signUp" className="mx-4 text-primary">Register</a>
                </div>
            </div>
        </nav>
    );
}

export default LoginNav
