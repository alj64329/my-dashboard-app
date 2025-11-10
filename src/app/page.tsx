import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center pt-20">
      <div>
        <Link 
        href="/admin-signup"
        className="bg-(--color-second-green) py-3 px-[1.3rem] rounded-3xl text-white font-karla font-bold">
        Get Started
        </Link>
      </div>
    </div>
  );
}
