import { NavLink as RouterNavLink } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

export const NavLink = ({ to, children }: NavLinkProps) => (
  <RouterNavLink to={to}
    className={({ isActive, isPending }) =>
      isPending ? "pending" : isActive ? "active" : ""
    }
  >
    {children}
  </RouterNavLink>
);