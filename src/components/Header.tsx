import Image from "next/image";
import Logo from "@/assests/Logo.png";
import { DarkModeToggler } from "./DarkModeToggler";
import { UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="bg-blue-500 h-12 w-12">
          <Image className="invert" src={Logo} alt="Dropbox Logo" />
        </div>
        <p className="font-bold text-xl"> Dropbox</p>
      </div>
      <div className="flex items-center space-x-3 pr-2 ">
        <DarkModeToggler />
        <UserButton afterSignOutUrl="/" />{" "}
      </div>
    </header>
  );
};

export default Header;
