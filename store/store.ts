import { create } from "zustand";

interface AppState {
  isDeletedModalOpen: boolean;
  setIsDeleteModalOpen: (open: boolean) => void;

  isRenameModalOpen: boolean;
  setIsRenameModalOpen: (open: boolean) => void;

  fileId: string | null;
  setFileId: (fieldId: string) => void;

  filename: string;
  setFilename: (filename: string) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  fileId: null,
  setFileId: (fileId: string) => set((state) => ({ fileId })),

  filename: "",
  setFilename: (filename: string) => set((state) => ({ filename })),

  isDeletedModalOpen: false,
  setIsDeleteModalOpen: (opan) =>
    set((state) => ({ isDeletedModalOpen: opan })),

  isRenameModalOpen: false,
  setIsRenameModalOpen: (open) => set((state) => ({ isRenameModalOpen: open })),
}));
