"use client";

import Link from "next/link";


export default function NotFound() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-background to-muted/20">
        <div className="container flex flex-col items-center justify-center gap-8 px-4 text-center">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <p className="text-2xl font-semibold text-muted-foreground sm:text-3xl">
            Page Not Found
          </p>
          <Link href="/"> Home</Link>
          </div>
      </div>
    </>
  );
}