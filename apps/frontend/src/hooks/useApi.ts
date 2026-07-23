import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getApiClient } from '@/lib/apiClient';
import { User, File as PDFFile, CreateUserSchema, LoginResponseSchema } from '@docfusion/shared';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';

// Auth queries
export function useLogin() {
  const authStore = useAuthStore();
  const uiStore = useUIStore();

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await getApiClient().post('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      const validated = LoginResponseSchema.parse(data);
      authStore.setUser(validated.user);
      authStore.setTokens(validated.accessToken, validated.refreshToken);
      uiStore.addNotification('success', 'Logged in successfully');
    },
    onError: () => {
      uiStore.addNotification('error', 'Login failed. Please try again.');
    },
  });
}

export function useRegister() {
  const authStore = useAuthStore();
  const uiStore = useUIStore();

  return useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
      firstName?: string;
      lastName?: string;
    }) => {
      const response = await getApiClient().post('/auth/register', data);
      return response.data;
    },
    onSuccess: (data) => {
      const validated = LoginResponseSchema.parse(data);
      authStore.setUser(validated.user);
      authStore.setTokens(validated.accessToken, validated.refreshToken);
      uiStore.addNotification('success', 'Account created successfully');
    },
    onError: () => {
      uiStore.addNotification('error', 'Registration failed. Please try again.');
    },
  });
}

export function useLogout() {
  const authStore = useAuthStore();
  const uiStore = useUIStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await getApiClient().post('/auth/logout');
    },
    onSuccess: () => {
      authStore.logout();
      queryClient.clear();
      uiStore.addNotification('success', 'Logged out successfully');
    },
  });
}

// File queries
export function useFiles() {
  return useQuery({
    queryKey: ['files'],
    queryFn: async () => {
      const response = await getApiClient().get('/files');
      return response.data.files;
    },
  });
}

export function useUploadFile() {
  const uiStore = useUIStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await getApiClient().post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
      uiStore.addNotification('success', 'File uploaded successfully');
    },
    onError: () => {
      uiStore.addNotification('error', 'Failed to upload file');
    },
  });
}

export function useDeleteFile() {
  const uiStore = useUIStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (fileId: string) => {
      await getApiClient().delete(`/files/${fileId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
      uiStore.addNotification('success', 'File deleted successfully');
    },
    onError: () => {
      uiStore.addNotification('error', 'Failed to delete file');
    },
  });
}

export function useFile(fileId: string) {
  return useQuery({
    queryKey: ['file', fileId],
    queryFn: async () => {
      const response = await getApiClient().get(`/files/${fileId}`);
      return response.data;
    },
  });
}
