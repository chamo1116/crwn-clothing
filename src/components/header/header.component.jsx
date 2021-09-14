import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

import { connect } from 'react-redux';
import { signOut } from 'firebase/auth';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cartt-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';

import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';




const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className="logo"></Logo>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/shop">
                SHOP
            </OptionLink>
            <OptionLink to="/shop">
                CONTACT
            </OptionLink>
            {
                currentUser ? (
                    <OptionLink as='div' onClick={() => signOut(auth)} >SIGN OUT</OptionLink>
                ) : (
                    <OptionLink to="/signin">SIGN IN</OptionLink>
                )
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null : <CartDropDown />
        }
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);