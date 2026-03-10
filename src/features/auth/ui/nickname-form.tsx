'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../model/auth-store';

const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9]{2,10}$/;

type NicknameFormProps = {
  kakaoId: string;
};

export function NicknameForm({ kakaoId }: NicknameFormProps) {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState<string | null>(null);
  const signup = useAuthStore((s) => s.signup);
  const isLoading = useAuthStore((s) => s.isLoading);

  const validate = (value: string): string | null => {
    if (value.length === 0) return '닉네임을 입력해주세요.';
    if (value.length < 2) return '닉네임은 2자 이상이어야 합니다.';
    if (value.length > 10) return '닉네임은 10자 이하여야 합니다.';
    if (!NICKNAME_REGEX.test(value)) return '한글, 영문, 숫자만 사용할 수 있습니다.';
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    if (error) {
      setError(validate(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate(nickname);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      await signup(kakaoId, nickname);
      router.replace('/');
    } catch {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="nickname" className="text-[14px] font-medium leading-[1.6] text-gray-700">
          닉네임
        </label>
        <input
          id="nickname"
          type="text"
          value={nickname}
          onChange={handleChange}
          placeholder="한글/영문/숫자 2-10자"
          maxLength={10}
          className={`rounded-lg border bg-white px-4 py-3 text-[14px] leading-[1.6] text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:ring-2 focus:ring-gray-400 ${
            error ? 'border-error-500' : 'border-gray-200'
          }`}
        />
        {error && <p className="text-[12px] font-medium text-error-500">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="rounded-lg bg-gray-900 px-6 py-3 text-[16px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isLoading ? '처리 중...' : '시작하기'}
      </button>
    </form>
  );
}
