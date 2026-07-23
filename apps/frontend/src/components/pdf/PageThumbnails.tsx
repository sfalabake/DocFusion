'use client';

import React, { useEffect, useState } from 'react';
import { usePDFEditorStore } from '@/stores/pdfEditorStore';
import { getPDFPage, renderPDFPage } from '@/lib/pdfUtils';
import clsx from 'clsx';

interface PageThumbnail {
  pageNumber: number;
  canvas: HTMLCanvasElement;
}

export const PageThumbnails: React.FC = () => {
  const {
    pdfDocument,
    currentPage,
    setCurrentPage,
    showThumbnails,
    toggleThumbnails,
    totalPages,
  } = usePDFEditorStore();

  const [thumbnails, setThumbnails] = useState<PageThumbnail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Generate thumbnails
  useEffect(() => {
    if (!pdfDocument || !showThumbnails) return;

    const generateThumbnails = async () => {
      setIsLoading(true);
      const thumbs: PageThumbnail[] = [];

      try {
        for (let i = 1; i <= Math.min(totalPages, 50); i++) {
          const page = await getPDFPage(pdfDocument, i);
          const canvas = document.createElement('canvas');

          await renderPDFPage(page, canvas, { scale: 0.15 });

          thumbs.push({
            pageNumber: i,
            canvas,
          });
        }

        setThumbnails(thumbs);
      } catch (error) {
        console.error('Failed to generate thumbnails:', error);
      } finally {
        setIsLoading(false);
      }
    };

    generateThumbnails();
  }, [pdfDocument, showThumbnails, totalPages]);

  if (!showThumbnails) {
    return (
      <button
        onClick={toggleThumbnails}
        className="fixed left-0 top-1/2 -translate-y-1/2 p-2 bg-primary-500 text-white rounded-r-lg shadow-lg hover:bg-primary-600 transition-colors z-40"
        title="Show thumbnails"
      >
        📄
      </button>
    );
  }

  return (
    <div className="w-40 bg-white dark:bg-secondary-900 border-r border-secondary-200 dark:border-secondary-800 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-secondary-200 dark:border-secondary-800">
        <h3 className="text-sm font-semibold text-secondary-900 dark:text-white">Pages</h3>
        <button
          onClick={toggleThumbnails}
          className="p-1 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded transition-colors"
          title="Hide thumbnails"
        >
          ←
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex-1 overflow-y-auto space-y-2 p-2">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin">⏳</div>
          </div>
        ) : (
          thumbnails.map((thumb) => (
            <button
              key={thumb.pageNumber}
              onClick={() => setCurrentPage(thumb.pageNumber)}
              className={clsx(
                'w-full p-2 rounded-lg border-2 transition-all hover:border-primary-500 overflow-hidden',
                currentPage === thumb.pageNumber
                  ? 'border-primary-500 shadow-md'
                  : 'border-secondary-300 dark:border-secondary-700'
              )}
              title={`Page ${thumb.pageNumber}`}
            >
              {/* Render thumbnail canvas */}
              <canvas
                ref={(el) => {
                  if (el && thumb.canvas) {
                    const ctx = el.getContext('2d');
                    if (ctx) {
                      el.width = thumb.canvas.width;
                      el.height = thumb.canvas.height;
                      ctx.drawImage(thumb.canvas, 0, 0);
                    }
                  }
                }}
                className="w-full h-auto bg-white dark:bg-secondary-800"
              />
              <span className="block text-xs text-center mt-1 text-secondary-600 dark:text-secondary-400">
                {thumb.pageNumber}
              </span>
            </button>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-secondary-200 dark:border-secondary-800 text-xs text-secondary-600 dark:text-secondary-400">
        <p>{totalPages} pages total</p>
      </div>
    </div>
  );
};

export default PageThumbnails;
