"use client";
import { useUser } from "@clerk/nextjs";
import { FileType } from "../../../typings";
import { Button } from "../ui/button";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase";
import { Skeleton } from "@/components/ui/skeleton";

const TableWrapper = ({ skeltonFiles }: { skeltonFiles: FileType[] }) => {
  const { user } = useUser();
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
  const [docs] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timeStamp", sort)
      )
  );

  useEffect(() => {
    if (!docs) return;
    const files: FileType[] = docs.docs.map((doc) => ({
      id: doc.id,
      filename: doc.data().fileName || doc.id,
      timestamp: new Date(doc.data().timeStamp?.seconds * 1000) || undefined,
      fullName: doc.data().fullName,
      downloadURL: doc.data().downloadURL,
      type: doc.data().type,
      size: doc.data().size,
    }));
    setInitialFiles(files);
  }, [docs]);

  if (docs?.docs.length === undefined)
    return <Skeleton className="w-full h-96 " />;

  return (
    <div className="flex flex-col space-y-5 pb-10">
      <Button
        className="ml-auto w-fit"
        variant={"outline"}
        onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
      >
        Sort By {sort === "desc" ? "Newest" : "oldest"}
      </Button>
      <DataTable columns={columns} data={initialFiles} />
    </div>
  );
};

export default TableWrapper;
