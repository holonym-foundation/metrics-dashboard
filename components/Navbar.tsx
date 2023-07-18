import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navMenu">
      <Link href="/proofs">Proofs</Link>
      <Link href="#">Blog</Link>
      <Link href="#">Work</Link>
      <Link href="#">About</Link>
    </nav>
  );
};

export default Navbar;
