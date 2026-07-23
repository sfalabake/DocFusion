'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useFile } from '@/hooks/useApi';
import { usePDFEditorStore } from '@/stores/pdfEditorStore';
import { PDFViewer } from '@/components/pdf/PDFViewer';
import { AnnotationToolbar } from '@/components/pdf/AnnotationToolbar';
import { PageThumbnails } from '@/components/pdf/PageThumbnails';
import { AnnotationsPanel } from '@/components/pdf/AnnotationsPanel';
import { Button, Card, Spinner, Alert } from '@/components/ui';
import Link from 'next/link';

export default function EditorPage() {
  const params = useParams();
  const fileId = params.id as string;

  // Fetch file data
  const { data: file, isLoading, error } = useFile(fileId);
  const { reset } = usePDFEditorStore();

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Reset editor state when component unmounts
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  // Mock save handler
  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('saving');

    try {
      // Simulate save API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaveStatus('saved');

      // Reset status after 2 seconds
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-secondary-600 dark:text-secondary-400">Loading file...</p>
        </div>
      </div>
    );
  }

  if (error || !file) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card variant="default" className="p-8">
          <Alert type="error" title="Error" message="Failed to load file" />
          <Link href="/app/dashboard" className="mt-4 inline-block">
            <Button variant="primary">← Back to Dashboard</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-secondary-50 dark:bg-secondary-950">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <Link href="/app/dashboard">
            <Button variant="ghost" size="sm">
              ← Back
            </Button>
          </Link>

          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-bold text-secondary-900 dark:text-white truncate">
              {file.fileName}
            </h1>
            <p className="text-xs text-secondary-500">
              {(file.fileSize / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saveStatus === 'saving' && (
            <div className="flex items-center gap-2 text-sm text-secondary-600 dark:text-secondary-400">
              <Spinner size="sm" />
              Saving...
            </div>
          )}

          {saveStatus === 'saved' && (
            <div className="text-sm text-green-600 dark:text-green-400">✓ Saved</div>
          )}

          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            isLoading={isSaving}
          >
            💾 Save
          </Button>

          <Button variant="ghost" size="sm">
            ⬇️ Export
          </Button>

          <Button variant="ghost" size="sm">
            🔗 Share
          </Button>
        </div>
      </div>

      {/* Annotation Toolbar */}
      <div className="px-4 py-3 bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800">
        <AnnotationToolbar />
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Thumbnails */}
        <PageThumbnails />

        {/* Center - PDF Viewer */}
        <div className="flex-1 flex flex-col overflow-hidden bg-secondary-100 dark:bg-secondary-800">
          <PDFViewer
            fileUrl={file.storageUrl}
            className="flex-1"
          />
        </div>

        {/* Right Sidebar - Annotations */}
        <AnnotationsPanel />
      </div>

      {/* Footer - Status Bar */}
      <div className="flex items-center justify-between p-3 bg-white dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-800 text-xs text-secondary-600 dark:text-secondary-400">
        <div>
          <span>File ID: {file.id}</span>
        </div>
        <div>
          <span>Last modified: {new Date(file.updatedAt).toLocaleString()}</span>
        </div>
        <div>
          <span>Status: {file.status}</span>
        </div>
      </div>
    </div>
  );
}
