'use client';

import React from 'react';
import { usePDFEditorStore } from '@/stores/pdfEditorStore';
import { Card, CardBody, CardHeader, Badge } from '@/components/ui';
import clsx from 'clsx';

export const AnnotationsPanel: React.FC = () => {
  const {
    annotations,
    currentPage,
    showAnnotations,
    toggleAnnotations,
    removeAnnotation,
    updateAnnotation,
  } = usePDFEditorStore();

  const currentPageAnnotations = annotations.filter((a) => a.pageNumber === currentPage);

  const getAnnotationTypeIcon = (type: string): string => {
    const icons: { [key: string]: string } = {
      highlight: '🖍️',
      underline: '✏️',
      draw: '✒️',
      text: 'T',
      note: '📝',
    };
    return icons[type] || '📌';
  };

  const getAnnotationTypeColor = (type: string): 'default' | 'success' | 'error' | 'warning' => {
    const colors: { [key: string]: 'default' | 'success' | 'error' | 'warning' } = {
      highlight: 'warning',
      underline: 'default',
      draw: 'success',
      text: 'default',
      note: 'info',
    };
    return colors[type] || 'default';
  };

  if (!showAnnotations) {
    return (
      <button
        onClick={toggleAnnotations}
        className="fixed right-0 top-1/2 -translate-y-1/2 p-2 bg-primary-500 text-white rounded-l-lg shadow-lg hover:bg-primary-600 transition-colors z-40"
        title="Show annotations"
      >
        📝
      </button>
    );
  }

  return (
    <div className="w-80 bg-white dark:bg-secondary-900 border-l border-secondary-200 dark:border-secondary-800 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-secondary-200 dark:border-secondary-800">
        <h3 className="text-sm font-semibold text-secondary-900 dark:text-white">Annotations</h3>
        <button
          onClick={toggleAnnotations}
          className="p-1 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded transition-colors"
          title="Hide annotations"
        >
          →
        </button>
      </div>

      {/* Annotations List */}
      <div className="flex-1 overflow-y-auto space-y-2 p-3">
        {currentPageAnnotations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-secondary-500 dark:text-secondary-400">No annotations on this page</p>
            <p className="text-xs text-secondary-400 dark:text-secondary-600 mt-2">
              Use the toolbar to create annotations
            </p>
          </div>
        ) : (
          currentPageAnnotations.map((annotation) => (
            <Card key={annotation.id} variant="default" className="p-3">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-lg flex-shrink-0">{getAnnotationTypeIcon(annotation.type)}</span>
                    <div className="min-w-0 flex-1">
                      <Badge variant={getAnnotationTypeColor(annotation.type)}>
                        {annotation.type.charAt(0).toUpperCase() + annotation.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <button
                    onClick={() => removeAnnotation(annotation.id)}
                    className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                    title="Delete annotation"
                  >
                    ✕
                  </button>
                </div>

                {/* Annotation Content */}
                {annotation.content && (
                  <div className="text-sm text-secondary-700 dark:text-secondary-300 bg-secondary-50 dark:bg-secondary-800 p-2 rounded break-words max-h-32 overflow-y-auto">
                    {annotation.content}
                  </div>
                )}

                {/* Coordinates */}
                <div className="text-xs text-secondary-500 space-y-1">
                  <p>
                    Position: ({Math.round(annotation.coordinates.x)}, {Math.round(annotation.coordinates.y)})
                  </p>
                  <p>
                    Size: {Math.round(annotation.coordinates.width)} × {Math.round(annotation.coordinates.height)}
                  </p>
                </div>

                {/* Timestamp */}
                <div className="text-xs text-secondary-400 pt-1 border-t border-secondary-200 dark:border-secondary-700">
                  {new Date(annotation.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-secondary-200 dark:border-secondary-800 text-xs text-secondary-600 dark:text-secondary-400">
        <p>{currentPageAnnotations.length} on this page</p>
        <p>{annotations.length} total</p>
      </div>
    </div>
  );
};

export default AnnotationsPanel;
