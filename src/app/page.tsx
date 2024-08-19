import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Link href={"/login"}>Login</Link>
    </div>
  );
}
