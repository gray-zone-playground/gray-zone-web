import { apiGet, apiPatch, apiDelete } from '@/src/shared/api/client';
import type { User } from '@/src/shared/types';

/** Fetch the currently authenticated user's profile. */
export async function getMyProfile(): Promise<User> {
  return apiGet<User>('/users/me');
}

/** Update the current user's nickname. */
export async function updateNickname(nickname: string): Promise<void> {
  await apiPatch<void>('/users/me/nickname', { nickname });
}

/** Permanently delete the current user's account. */
export async function deleteAccount(): Promise<void> {
  await apiDelete<void>('/users/me');
}
