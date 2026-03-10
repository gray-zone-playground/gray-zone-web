'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body>
        <div style={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          padding: '16px',
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>
            문제가 발생했습니다
          </h2>
          <p style={{ fontSize: '14px', color: '#737373' }}>
            일시적인 오류가 발생했습니다. 다시 시도해주세요.
          </p>
          <button
            onClick={reset}
            style={{
              padding: '8px 16px',
              fontSize: '16px',
              fontWeight: 600,
              borderRadius: '8px',
              backgroundColor: '#171717',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
}
