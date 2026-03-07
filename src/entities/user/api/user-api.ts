// TODO: base URL is not set yet — configure in @/src/shared/api/client
import { apiGet, apiPatch, apiDelete } from '@/src/shared/api/client';
import type { User } from '@/src/shared/types';

/** Fetch the currently authenticated user's profile. */
export async function getMyProfile(): Promise<User> {
  // TODO: confirm actual server URL — GET /users/me
  return apiGet<User>('/users/me');
}

/** Update the current user's nickname. */
export async function updateNickname(nickname: string): Promise<void> {
  // TODO: confirm actual server URL — PATCH /users/me/nickname
  await apiPatch<void>('/users/me/nickname', { nickname });
}

/** Permanently delete the current user's account. */
export async function deleteAccount(): Promise<void> {
  // TODO: confirm actual server URL — DELETE /users/me
  await apiDelete<void>('/users/me');
}
