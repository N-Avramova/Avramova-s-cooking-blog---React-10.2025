import { Link } from 'react-router';

export default function Header() {
  return (
    <nav>
      <Link className="home" to="/">Home</Link>     
    </nav>
  )
}