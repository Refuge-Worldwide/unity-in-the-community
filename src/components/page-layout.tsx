type PageLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <section>
      <h1>{title}</h1>
      <div className="space-y-8">{children}</div>
    </section>
  );
}
