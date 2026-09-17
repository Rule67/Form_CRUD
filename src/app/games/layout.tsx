import "./games.css";

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="games-page-wrapper">
      <main>{children}</main>
    </div>
  );
}