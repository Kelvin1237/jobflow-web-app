import logo from "../assets/images/logo.png";

const Logo = () => {
  return (
    <nav className="navLogo navbarLogoDisplay">
      <img src={logo} alt="Vin Jobs" width={50} />
      <h1 className="logoH1">JobFlow</h1>
    </nav>
  );
};

export default Logo;
