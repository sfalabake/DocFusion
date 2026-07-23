'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { Spinner } from '@/components/ui';
import { usePDFEditorStore } from '@/stores/pdfEditorStore';
import { loadPDF, renderPDFPage, getPDFPage, cleanupPDF } from '@/lib/pdfUtils';
import clsx from 'clsx';

interface PDFViewerProps {
  fileUrl: string;
  className?: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    pdfDocument,
    currentPage,
    pageScale,
    setPdfDocument,
    setPdfUrl,
    setCurrentPage,
  } = usePDFEditorStore();

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Load PDF on mount or when fileUrl changes
  useEffect(() => {
    const loadPDFFile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const doc = await loadPDF(fileUrl);
        setPdfDocument(doc, doc.numPages);
        setPdfUrl(fileUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load PDF');
        console.error('PDF loading error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPDFFile();

    return () => {
      if (pdfDocument) {
        cleanupPDF(pdfDocument);
      }
    };
  }, [fileUrl, setPdfDocument, setPdfUrl, pdfDocument]);

  // Render current page
  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDocument || !canvasRef.current) return;

      try {
        const page = await getPDFPage(pdfDocument, currentPage);
        await renderPDFPage(page, canvasRef.current, { scale: pageScale });
      } catch (err) {
        console.error('Page rendering error:', err);
        setError('Failed to render page');
      }
    };

    if (!isLoading) {
      renderPage();
    }
  }, [pdfDocument, currentPage, pageScale, isLoading]);

  // Handle page navigation
  const goToPreviousPage = useCallback(() => {
    setCurrentPage(currentPage - 1);
  }, [currentPage, setCurrentPage]);

  const goToNextPage = useCallback(() => {
    setCurrentPage(currentPage + 1);
  }, [currentPage, setCurrentPage]);

  return (
    <div className={clsx('flex flex-col h-full bg-secondary-100 dark:bg-secondary-800', className)}>
      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg m-4">
          <p className="text-red-700 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Spinner size="lg" />
            <p className="mt-4 text-secondary-600 dark:text-secondary-400">Loading PDF...</p>
          </div>
        </div>
      )}

      {/* PDF Canvas */}
      {!isLoading && !error && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Canvas Container */}
          <div
            ref={containerRef}
            className="flex-1 flex items-center justify-center overflow-auto bg-secondary-200 dark:bg-secondary-900 p-4"
          >
            <canvas
              ref={canvasRef}
              className="shadow-lg max-h-full max-w-full"
              style={{ border: '1px solid #ccc' }}
            />
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 p-4 bg-white dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-800">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage <= 1}
              className="px-4 py-2 bg-secondary-200 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary-300 dark:hover:bg-secondary-700 transition-colors"
            >
              ← Previous
            </button>

            <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
              Page {currentPage} / {pdfDocument?.numPages || 0}
            </span>

            <input
              type="number"
              min={1}
              max={pdfDocument?.numPages || 1}
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (!isNaN(page)) setCurrentPage(page);
              }}
              className="w-16 px-2 py-1 border border-secondary-300 dark:border-secondary-600 rounded-lg text-center dark:bg-secondary-800 dark:text-white"
            />

            <button
              onClick={goToNextPage}
              disabled={currentPage >= (pdfDocument?.numPages || 1)}
              className="px-4 py-2 bg-secondary-200 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary-300 dark:hover:bg-secondary-700 transition-colors"
            >
              Next →
            </button>

            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => {
                  // Decrease zoom
                }}
                className="px-3 py-1 bg-secondary-100 dark:bg-secondary-800 rounded-lg hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
              >
                −
              </button>
              <span className="text-sm font-medium w-12 text-center">{Math.round(pageScale * 100)}%</span>
              <button
                onClick={() => {
                  // Increase zoom
                }}
                className="px-3 py-1 bg-secondary-100 dark:bg-secondary-800 rounded-lg hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
