import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';

// Set up the worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

export interface PageRenderOptions {
  scale?: number;
  rotation?: number;
  canvas?: HTMLCanvasElement;
}

/**
 * Load a PDF from URL or Blob
 */
export async function loadPDF(source: string | Blob): Promise<PDFDocumentProxy> {
  try {
    if (source instanceof Blob) {
      const arrayBuffer = await source.arrayBuffer();
      return await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    } else {
      return await pdfjsLib.getDocument(source).promise;
    }
  } catch (error) {
    console.error('Failed to load PDF:', error);
    throw error;
  }
}

/**
 * Get PDF page
 */
export async function getPDFPage(
  pdfDocument: PDFDocumentProxy,
  pageNumber: number
): Promise<PDFPageProxy> {
  return pdfDocument.getPage(pageNumber);
}

/**
 * Render PDF page to canvas
 */
export async function renderPDFPage(
  page: PDFPageProxy,
  canvas: HTMLCanvasElement,
  options: PageRenderOptions = {}
): Promise<void> {
  const { scale = 1, rotation = 0 } = options;

  const viewport = page.getViewport({ scale, rotation });

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Could not get canvas context');
  }

  try {
    await page.render({
      canvasContext: context,
      viewport,
    }).promise;
  } catch (error) {
    console.error('Failed to render PDF page:', error);
    throw error;
  }
}

/**
 * Get PDF page dimensions
 */
export function getPDFPageDimensions(
  page: PDFPageProxy,
  scale: number = 1
): { width: number; height: number } {
  const viewport = page.getViewport({ scale });
  return {
    width: viewport.width,
    height: viewport.height,
  };
}

/**
 * Extract text from PDF page
 */
export async function extractTextFromPage(page: PDFPageProxy): Promise<string> {
  try {
    const textContent = await page.getTextContent();
    return textContent.items
      .map((item: any) => item.str)
      .join(' ');
  } catch (error) {
    console.error('Failed to extract text:', error);
    return '';
  }
}

/**
 * Get total pages count
 */
export function getPDFPageCount(pdfDocument: PDFDocumentProxy): number {
  return pdfDocument.numPages;
}

/**
 * Convert coordinates from PDF space to canvas space
 */
export function convertPDFCoordinatesToCanvas(
  pdfX: number,
  pdfY: number,
  pageHeight: number,
  scale: number = 1
): { x: number; y: number } {
  return {
    x: pdfX * scale,
    y: (pageHeight - pdfY) * scale,
  };
}

/**
 * Convert coordinates from canvas space to PDF space
 */
export function convertCanvasCoordinatesToPDF(
  canvasX: number,
  canvasY: number,
  pageHeight: number,
  scale: number = 1
): { x: number; y: number } {
  return {
    x: canvasX / scale,
    y: pageHeight - canvasY / scale,
  };
}

/**
 * Cleanup PDF resources
 */
export async function cleanupPDF(pdfDocument: PDFDocumentProxy): Promise<void> {
  try {
    await pdfDocument.destroy();
  } catch (error) {
    console.error('Failed to cleanup PDF:', error);
  }
}
