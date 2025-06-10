import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Link } from './';

describe('Link component', () => {
  it('should render a link', () => {
    render(<Link href="https://spendesk.com/">Click Me</Link>);

    expect(screen.getByRole('link', { name: 'Click Me' })).toBeVisible();
  });

  it('should call onClick when given onClick props', async () => {
    const handleClick = vi.fn();
    render(
      <Link href="#" onClick={handleClick}>
        Click Me
      </Link>,
    );

    await userEvent.click(screen.getByRole('link', { name: 'Click Me' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should attach the right attribut when isExternal is provided', () => {
    render(
      <Link href="https://helpcenter.spendesk.com/" isExternal>
        Need help ?
      </Link>,
    );

    const link = screen.getByRole('link', { name: 'Need help ?' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should support custom component through `as` props', () => {
    const NavLink = ({ to, className }: { to: string; className: string }) => {
      return (
        <a href={to} className={className}>
          I am a NavLink
        </a>
      );
    };

    const NextLink = ({
      href,
      className,
    }: {
      href: string;
      className: string;
    }) => {
      return (
        <a href={href} className={className}>
          I am a NextLink
        </a>
      );
    };

    render(<Link as={NavLink} to="https://spendesk.com" className="navLink" />);

    const navEl = screen.getByRole('link', { name: 'I am a NavLink' });
    expect(navEl).toBeVisible();
    expect(navEl).toHaveAttribute('href', 'https://spendesk.com');

    render(
      <Link as={NextLink} href="https://spendesk.com" className="navLink" />,
    );

    const nextEl = screen.getByRole('link', { name: 'I am a NextLink' });
    expect(nextEl).toBeVisible();
    expect(nextEl).toHaveAttribute('href', 'https://spendesk.com');
  });
});
