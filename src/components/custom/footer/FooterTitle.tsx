interface FooterTitleProps {
  children: React.ReactNode;
}

export function FooterTitle({ children }: FooterTitleProps) {
  return (
    <h3 className="text-lg font-serif font-bold mb-8 text-gray-800 tracking-tight">
      {children}
    </h3>
  );
}
