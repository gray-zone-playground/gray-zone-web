'use client';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export function KakaoLoginButton() {
  const handleClick = () => {
    const redirectUrl = encodeURIComponent(window.location.origin);
    window.location.href = `${API_URL}/auth/kakao?redirectUrl=${redirectUrl}`;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FEE500] px-6 py-3 text-base font-semibold text-[#191919] transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 0.5C4.029 0.5 0 3.588 0 7.39C0 9.787 1.558 11.898 3.931 13.124L2.933 16.717C2.845 17.026 3.213 17.271 3.479 17.089L7.873 14.17C8.242 14.21 8.618 14.28 9 14.28C13.971 14.28 18 11.192 18 7.39C18 3.588 13.971 0.5 9 0.5Z"
          fill="#191919"
        />
      </svg>
      카카오로 시작하기
    </button>
  );
}
