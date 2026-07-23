import { create } from 'zustand';
import { PDFDocumentProxy } from 'pdfjs-dist';

export interface PDFAnnotation {
  id: string;
  type: 'highlight' | 'underline' | 'note' | 'draw' | 'text';
  pageNumber: number;
  content?: string;
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  color?: string;
  timestamp: Date;
  createdBy: string;
}

export interface PDFEditorState {
  // PDF document state
  pdfDocument: PDFDocumentProxy | null;
  pdfUrl: string | null;
  currentPage: number;
  totalPages: number;
  pageScale: number;

  // Editing state
  selectedTool: 'select' | 'highlight' | 'underline' | 'draw' | 'text' | 'note' | null;
  annotations: PDFAnnotation[];
  canvasDrawing: boolean;

  // UI state
  showAnnotations: boolean;
  showThumbnails: boolean;

  // Actions
  setPdfDocument: (doc: PDFDocumentProxy | null, totalPages: number) => void;
  setPdfUrl: (url: string | null) => void;
  setCurrentPage: (page: number) => void;
  setPageScale: (scale: number) => void;
  selectTool: (tool: 'select' | 'highlight' | 'underline' | 'draw' | 'text' | 'note' | null) => void;
  addAnnotation: (annotation: PDFAnnotation) => void;
  removeAnnotation: (id: string) => void;
  updateAnnotation: (id: string, updates: Partial<PDFAnnotation>) => void;
  setAnnotations: (annotations: PDFAnnotation[]) => void;
  setCanvasDrawing: (drawing: boolean) => void;
  toggleAnnotations: () => void;
  toggleThumbnails: () => void;
  reset: () => void;
}

export const usePDFEditorStore = create<PDFEditorState>((set) => ({
  pdfDocument: null,
  pdfUrl: null,
  currentPage: 1,
  totalPages: 0,
  pageScale: 1,

  selectedTool: null,
  annotations: [],
  canvasDrawing: false,

  showAnnotations: true,
  showThumbnails: true,

  setPdfDocument: (doc, totalPages) =>
    set({
      pdfDocument: doc,
      totalPages,
      currentPage: 1,
    }),

  setPdfUrl: (url) => set({ pdfUrl: url }),

  setCurrentPage: (page) =>
    set((state) => ({
      currentPage: Math.max(1, Math.min(page, state.totalPages)),
    })),

  setPageScale: (scale) =>
    set({
      pageScale: Math.max(0.5, Math.min(scale, 3)),
    }),

  selectTool: (tool) => set({ selectedTool: tool }),

  addAnnotation: (annotation) =>
    set((state) => ({
      annotations: [...state.annotations, annotation],
    })),

  removeAnnotation: (id) =>
    set((state) => ({
      annotations: state.annotations.filter((a) => a.id !== id),
    })),

  updateAnnotation: (id, updates) =>
    set((state) => ({
      annotations: state.annotations.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    })),

  setAnnotations: (annotations) => set({ annotations }),

  setCanvasDrawing: (drawing) => set({ canvasDrawing: drawing }),

  toggleAnnotations: () =>
    set((state) => ({
      showAnnotations: !state.showAnnotations,
    })),

  toggleThumbnails: () =>
    set((state) => ({
      showThumbnails: !state.showThumbnails,
    })),

  reset: () =>
    set({
      pdfDocument: null,
      pdfUrl: null,
      currentPage: 1,
      totalPages: 0,
      pageScale: 1,
      selectedTool: null,
      annotations: [],
      canvasDrawing: false,
      showAnnotations: true,
      showThumbnails: true,
    }),
}));
