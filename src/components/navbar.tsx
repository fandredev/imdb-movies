import Logo from './logo';

interface HeaderProps {
  children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <nav className="nav-bar">
      <Logo />

      {children}
    </nav>
  );
}
