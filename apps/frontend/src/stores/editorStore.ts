import { create } from 'zustand';
import { File } from '@docfusion/shared';

export interface EditorState {
  currentFile: File | null;
  files: File[];
  isLoading: boolean;

  setCurrentFile: (file: File | null) => void;
  setFiles: (files: File[]) => void;
  addFile: (file: File) => void;
  removeFile: (fileId: string) => void;
  updateFile: (fileId: string, updates: Partial<File>) => void;
  setLoading: (loading: boolean) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  currentFile: null,
  files: [],
  isLoading: false,

  setCurrentFile: (file) => set({ currentFile: file }),
  setFiles: (files) => set({ files }),
  addFile: (file) =>
    set((state) => ({
      files: [file, ...state.files],
    })),
  removeFile: (fileId) =>
    set((state) => ({
      files: state.files.filter((f) => f.id !== fileId),
    })),
  updateFile: (fileId, updates) =>
    set((state) => ({
      files: state.files.map((f) => (f.id === fileId ? { ...f, ...updates } : f)),
      currentFile: state.currentFile?.id === fileId ? { ...state.currentFile, ...updates } : state.currentFile,
    })),
  setLoading: (loading) => set({ isLoading: loading }),
}));
