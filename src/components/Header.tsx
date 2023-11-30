import Image from "next/image";
import Logo from "@/assests/Logo.png";
import { DarkModeToggler } from "./DarkModeToggler";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <div className="bg-blue-500 w-fit ">
          <Image
            className="invert"
            height={50}
            width={50}
            src={Logo}
            alt="Dropbox Logo"
          />
        </div>
        <p className="font-bold text-xl"> Dropbox</p>
      </Link>
      <div className="flex items-center space-x-3 px-5 ">
        <DarkModeToggler />
        <UserButton afterSignOutUrl="/" />{" "}
        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
