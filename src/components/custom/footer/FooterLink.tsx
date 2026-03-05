interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

export function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-neutral-400 transition-colors font-sans"
    >
      {children}
    </a>
  );
}
