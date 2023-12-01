import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center flex-col lg:flex-row bg-[#1E1919] dark:bg-slate-800   ">
      <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 space-y-5 text-white  ">
        <p className="text-5xl font-bold">
          Everything you and your business need to work efficiently, all in one
          place
        </p>
        <p className="pb-20">
          Collaborate seamlessly and deliver work faster from anywhere with
          Dropbox. Securely store your content, edit PDFs, share videos, sign
          documents and track file engagement—without leaving Dropbox.
        </p>
        <Link
          href="/dashboard"
          className="cursor-pointer flex bg-blue-700 p-5 w-fit hover:bg-blue-400 "
        >
          Try it for free <ArrowRight className="ml-10" />
        </Link>
      </div>{" "}
      <div className="bg-[#1E1919] dark:bg-slate-800 h-full p-10">
        <video className="rounded-lg" autoPlay={true} loop={true} muted>
          <source src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4" />
        </video>
      </div>
    </main>
  );
}
