import Link from "next/link";
import LogoMain from "./LogoMain";

export default function Navbar() {
  return (
    <div className="p-3">
      <nav>
        <div className="flex gap-2 items-center">
        <LogoMain/>
        <Link href={'/'}>
        <strong className="text-xl">
          Enatega
        </strong>
        </Link>
        </div>
      </nav>
    </div>
  );
}
