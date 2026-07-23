// Lightweight storage helper for development presigned flow

export interface PresignResponse {
  uploadUrl: string;
  method: 'PUT' | 'POST' | 'PATCH';
  headers?: Record<string, string>;
  fileKey?: string;
}

export async function getPresign(fileName: string, contentType: string): Promise<PresignResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/storage/presign`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ fileName, contentType }),
  });

  if (!res.ok) throw new Error('Failed to get presign');
  return res.json();
}

export async function directUpload(uploadUrl: string, file: File, headers?: Record<string, string>) {
  const res = await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      ...(headers || {}),
      'Content-Type': file.type,
    },
  });

  if (!res.ok) throw new Error('Upload failed');
  return res;
}
