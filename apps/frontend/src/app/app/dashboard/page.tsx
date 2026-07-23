'use client';

import { useFiles, useUploadFile } from '@/hooks/useApi';
import { Button, Card, CardBody, CardHeader, Spinner } from '@/components/ui';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: files, isLoading } = useFiles();
  const uploadMutation = useUploadFile();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadMutation.mutate(file);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-secondary-600 dark:text-secondary-400">Manage and edit your PDF files</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card variant="default">
          <CardBody className="p-6 text-center">
            <div className="text-4xl mb-2">📄</div>
            <h3 className="font-semibold text-secondary-900 dark:text-white mb-2">Total Files</h3>
            <p className="text-2xl font-bold text-primary-500">{files?.length || 0}</p>
          </CardBody>
        </Card>

        <Card variant="default">
          <CardBody className="p-6 text-center">
            <div className="text-4xl mb-2">💾</div>
            <h3 className="font-semibold text-secondary-900 dark:text-white mb-2">Storage Used</h3>
            <p className="text-2xl font-bold text-primary-500">
              {files?.reduce((acc, file) => acc + (file.fileSize || 0), 0) / 1024 / 1024 > 1024
                ? (files?.reduce((acc, file) => acc + (file.fileSize || 0), 0) / 1024 / 1024 / 1024).toFixed(2) + ' GB'
                : (files?.reduce((acc, file) => acc + (file.fileSize || 0), 0) / 1024 / 1024).toFixed(2) + ' MB'}
            </p>
          </CardBody>
        </Card>

        <Card variant="default">
          <CardBody className="p-6 text-center">
            <div className="text-4xl mb-2">📅</div>
            <h3 className="font-semibold text-secondary-900 dark:text-white mb-2">Last Modified</h3>
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              {files && files.length > 0
                ? new Date(files[0].updatedAt).toLocaleDateString()
                : 'No files yet'}
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Upload Section */}
      <Card variant="default" className="mb-8">
        <CardHeader title="Upload New File" />
        <CardBody className="p-6">
          <div className="border-2 border-dashed border-secondary-300 dark:border-secondary-700 rounded-lg p-8 text-center hover:border-primary-500 transition-colors cursor-pointer">
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-4xl mb-2">📤</div>
              <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">
                Click to upload or drag and drop
              </h3>
              <p className="text-sm text-secondary-500 mb-4">PDF files up to 100MB</p>
              <input
                id="file-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploadMutation.isPending}
              />
              <Button variant="primary" size="sm" asChild>
                <span>Choose File</span>
              </Button>
            </label>
            {uploadMutation.isPending && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <Spinner size="sm" />
                <span className="text-sm text-secondary-600 dark:text-secondary-400">Uploading...</span>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Files Section */}
      <Card variant="default">
        <CardHeader title="Recent Files" />
        <CardBody>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Spinner />
            </div>
          ) : files && files.length > 0 ? (
            <div className="space-y-2">
              {files.map((file) => (
                <Link
                  key={file.id}
                  href={`/app/editor/${file.id}`}
                  className="flex items-center justify-between p-4 hover:bg-secondary-50 dark:hover:bg-secondary-800 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-xl">📄</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-secondary-900 dark:text-white truncate">{file.fileName}</p>
                      <p className="text-xs text-secondary-500">
                        {new Date(file.updatedAt).toLocaleDateString()} • {(file.fileSize / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <span className="text-primary-500 ml-2">→</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">📭</div>
              <p className="text-secondary-600 dark:text-secondary-400">No files yet. Upload your first PDF to get started!</p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
