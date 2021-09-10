import './header.styles.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { signOut } from 'firebase/auth';


const Header = ({ currentUser }) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo"></Logo>
        </Link>
        <div className="options">
            <Link className="option" to="/shops">
                SHOP
            </Link>
            <Link className="option" to="/shops">
                CONTACT
            </Link>
            {
                currentUser ? (
                    <div className="option" onClick={() => signOut(auth)} >SIGN OUT</div>
                ) : (
                    <Link className="option" to="/signin">SIGN IN</Link>
                )
            }
        </div>
    </div>
);

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Header);