import LogoMain from "./LogoMain";

export default function Navbar() {
  return (
    <div className="p-3">
      <nav>
        <div className="flex gap-2 items-center">
        <LogoMain/>
        <strong className="text-xl">
          Enatega
        </strong>
        </div>
      </nav>
    </div>
  );
}
