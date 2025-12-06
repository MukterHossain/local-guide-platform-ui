"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes pulse-error {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.2;
          }
        }

        @keyframes glow-destructive {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.5;
          }
        }

        .fade-up {
          animation: fade-up 0.5s ease-out;
        }

        .scale-in {
          animation: scale-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .pulse-error {
          animation: pulse-error 2s ease-in-out infinite;
        }

        .glow-destructive {
          animation: glow-destructive 4s ease-in-out infinite;
        }
      `}</style>
      <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-background to-muted/20 p-4">
        <div className="w-full max-w-2xl fade-up">
          <h1>Hello</h1>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-destructive/5 blur-3xl -z-10 glow-destructive" />
        </div>
      </div>
    </>
  );
}