"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useAppStore } from "../../store/store";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const RenameModal = () => {
  const { user } = useUser();
  const [input, setInput] = useState("");

  const [isRenameModalOpen, setIsRenameModalOpen, fileId, fileName] =
    useAppStore((state) => [
      state.isRenameModalOpen,
      state.setIsRenameModalOpen,
      state.fileId,
      state.fileName,
    ]);
  console.log(fileId);

  const renameFile = async () => {
    if (!user || !fileId) return;

    await updateDoc(doc(db, `users/${user.id}/files/${fileId}`), {
      fileName: input,
    });
    setIsRenameModalOpen(false);
  };

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => setIsRenameModalOpen(isOpen)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-2">Rename the File</DialogTitle>
          <Input
            id="link"
            defaultValue={fileName}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                renameFile();
              }
            }}
          />
          <div className="flex justify-end space-x-2 py-3">
            <Button
              size={"sm"}
              className="px-3"
              variant={"ghost"}
              onClick={() => setIsRenameModalOpen(false)}
            >
              <span className="sr-only">Cancel</span>
              <span>cancel</span>
            </Button>
            <Button
              type="submit"
              size={"sm"}
              className="px-3"
              onClick={() => renameFile()}
            >
              <span className="sr-only">Rename</span>
              <span>Rename</span>
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;
