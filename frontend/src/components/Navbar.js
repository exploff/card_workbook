import { useContext } from "react";
import { Link } from "react-router-dom";
import Auth from "../contexts/Auth";
import './Navbar.scss';

const Navbar = () => {
    const { isAuthenticated } = useContext(Auth);
    console.log(isAuthenticated)

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    {(!isAuthenticated) ? (
                        <Link to="/login">Login</Link>
                    ) : (
                        <button onClick={handleLogout}>Logout</button>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;