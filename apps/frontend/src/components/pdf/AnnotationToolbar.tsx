'use client';

import React from 'react';
import { usePDFEditorStore } from '@/stores/pdfEditorStore';
import clsx from 'clsx';

interface ToolbarItem {
  id: 'select' | 'highlight' | 'underline' | 'draw' | 'text' | 'note';
  label: string;
  icon: string;
  shortcut?: string;
  description: string;
}

const TOOLS: ToolbarItem[] = [
  {
    id: 'select',
    label: 'Select',
    icon: '🖱️',
    shortcut: 'S',
    description: 'Select and move annotations',
  },
  {
    id: 'highlight',
    label: 'Highlight',
    icon: '🖍️',
    shortcut: 'H',
    description: 'Highlight text',
  },
  {
    id: 'underline',
    label: 'Underline',
    icon: '✏️',
    shortcut: 'U',
    description: 'Underline text',
  },
  {
    id: 'draw',
    label: 'Draw',
    icon: '✒️',
    shortcut: 'D',
    description: 'Freehand drawing',
  },
  {
    id: 'text',
    label: 'Text',
    icon: 'T',
    shortcut: 'T',
    description: 'Add text annotation',
  },
  {
    id: 'note',
    label: 'Note',
    icon: '📝',
    shortcut: 'N',
    description: 'Add sticky note',
  },
];

export const AnnotationToolbar: React.FC = () => {
  const { selectedTool, selectTool } = usePDFEditorStore();

  const handleToolSelect = (toolId: 'select' | 'highlight' | 'underline' | 'draw' | 'text' | 'note') => {
    selectTool(selectedTool === toolId ? null : toolId);
  };

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) return;

      const toolMap: { [key: string]: any } = {
        s: 'select',
        h: 'highlight',
        u: 'underline',
        d: 'draw',
        t: 'text',
        n: 'note',
      };

      const tool = toolMap[e.key.toLowerCase()];
      if (tool) {
        e.preventDefault();
        handleToolSelect(tool);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTool]);

  return (
    <div className="flex items-center gap-2 p-3 bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800 rounded-lg shadow-sm overflow-x-auto">
      {/* Tools */}
      <div className="flex items-center gap-1">
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            onClick={() => handleToolSelect(tool.id)}
            title={`${tool.label} (${tool.shortcut})`}
            className={clsx(
              'flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200',
              selectedTool === tool.id
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
            )}
          >
            <span className="text-lg">{tool.icon}</span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-secondary-200 dark:bg-secondary-700 mx-2" />

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button
          title="Delete selected (Delete key)"
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-300 transition-all"
        >
          🗑️
        </button>

        <button
          title="Undo (Ctrl+Z)"
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-all"
        >
          ↶
        </button>

        <button
          title="Redo (Ctrl+Y)"
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-all"
        >
          ↷
        </button>
      </div>

      {/* Selected Tool Info */}
      {selectedTool && (
        <div className="ml-auto text-sm text-secondary-600 dark:text-secondary-400">
          <span>
            {TOOLS.find((t) => t.id === selectedTool)?.description}
          </span>
        </div>
      )}
    </div>
  );
};

export default AnnotationToolbar;
