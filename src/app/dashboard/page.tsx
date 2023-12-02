import { auth } from "@clerk/nextjs";
import DropZoneComponents from "@/components/DropZoneComponents";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import type { Metadata } from "next";

const Dashboard = async () => {
  const { userId, user } = auth();
  const docRef = collection(db, `users/${user?.id}/files`);
  const docSnap = await getDocs(docRef);

  docSnap.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });

  return (
    <div>
      Dashboard
      <DropZoneComponents />
    </div>
  );
};

export default Dashboard;

export const metadata: Metadata = {
  title: "Dropbox | Dashboard",

  description: "Dashboard description",
};
