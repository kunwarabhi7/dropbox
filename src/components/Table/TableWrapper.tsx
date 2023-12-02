"use client";
import { useUser } from "@clerk/nextjs";
import { FileType } from "../../../typings";
import { Button } from "../ui/button";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { useState } from "react";

const TableWrapper = ({ skeltonFiles }: { skeltonFiles: FileType[] }) => {
  const { user } = useUser();
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  return (
    <div>
      <Button
        variant={"outline"}
        onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
      >
        Sort By {sort === "desc" ? "Newest" : "oldest"}
      </Button>
      <DataTable columns={columns} data={skeltonFiles} />
    </div>
  );
};

export default TableWrapper;
