import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navMenu">
      <Link href="/proofs">
        Proofs
      </Link>
      <Link href="/verifications">
        Verifications
      </Link>
      <Link href="#">
        Costs
      </Link>
    </nav>
  );
};

export default Navbar;
