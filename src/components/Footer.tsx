import Logo from "../assets/logo_black.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white p-4 shadow-inner mt-auto">
      <div className="flex items-center justify-center gap-2 flex-wrap text-sm text-gray-600">
        <img src={Logo} alt="eKaze Logo" className="w-[100px] h-auto" />
        <span>© {currentYear} - All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
