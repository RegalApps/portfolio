"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <h2>Something went wrong!</h2>
      <pre style={{ color: 'red', margin: '16px 0' }}>{error?.message}</pre>
      <button
        style={{ padding: '8px 16px', borderRadius: 4, background: '#111', color: '#fff', border: 'none', cursor: 'pointer' }}
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
