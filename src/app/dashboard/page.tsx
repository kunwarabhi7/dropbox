import { auth } from "@clerk/nextjs";
import DropZoneComponents from "@/components/DropZoneComponents";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import type { Metadata } from "next";
import { FileType } from "../../../typings";
import TableWrapper from "@/components/Table/TableWrapper";

const Dashboard = async () => {
  const { userId, user } = auth();
  const docRef = collection(db, `users/${userId}/files`);
  const docResults = await getDocs(docRef);
  const skeltonFiles: FileType[] = docResults.docs.map((doc) => ({
    id: doc.id,
    filename: doc.data().filename || doc.id,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    fullName: doc.data().fullName,
    downloadURL: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size,
  }));
  console.log(skeltonFiles);

  return (
    <div className="border-t">
      Dashboard
      <DropZoneComponents />
      <section className="container space-y-5">
        <h2 className="font-bold">All files</h2>
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
