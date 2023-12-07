import { auth } from "@clerk/nextjs";
import DropZoneComponents from "@/components/DropZoneComponents";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import type { Metadata } from "next";
import { FileType } from "../../../typings";
import TableWrapper from "@/components/Table/TableWrapper";

const Dashboard = async () => {
  const { userId } = auth();

  const docResults = await getDocs(collection(db, "users", userId!, "files"));
  const skeltonFiles: FileType[] = docResults.docs.map((doc) => ({
    id: doc.id,
    filename: doc.data().fileName || doc.id,
    timestamp: new Date(doc.data().timeStamp?.seconds * 1000) || undefined,
    fullName: doc.data().fullName,
    downloadURL: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size,
  }));

  return (
    <div className="border-t m-8 rounded-md">
      <DropZoneComponents />
      <section className="container space-y-5">
        <h2 className="font-bold mt-4">All files</h2>
        <div>
          <TableWrapper skeltonFiles={skeltonFiles} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

export const metadata: Metadata = {
  title: "Dropbox | Dashboard",

  description: "Dashboard description",
};
