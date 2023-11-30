import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center flex-col xl:flex-row ">
      <div>
        <p>
          Everything you and your business need to work efficiently, all in one
          place
        </p>
        <p>
          Collaborate seamlessly and deliver work faster from anywhere with
          Dropbox. Securely store your content, edit PDFs, share videos, sign
          documents and track file engagement—without leaving Dropbox.
        </p>
        <Link href="/dashboard">
          <Button>
            Try it for free{" "}
            <span>
              <ArrowRight />
            </span>
          </Button>
        </Link>
      </div>{" "}
      <video
        className="mx-auto w-[32rem] h-full"
        autoPlay={true}
        loop={true}
        src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
      ></video>
    </div>
  );
}
