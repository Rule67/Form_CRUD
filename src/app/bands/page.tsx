import { bands } from "@/data/bands";
import BandCard from "@/components/BandCard";

export default function BandsPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#d8f3dc",
        padding: "40px 20px",
      }}
    >
      <h1
        style={{
          fontSize: "2.25rem",
          fontWeight: "bold",
          marginBottom: "32px",
          color: "#000",
          maxWidth: "1400px",
          margin: "0 auto 32px auto",
        }}
      >
        MyFavorite Bands
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {bands.map((band) => (
          <BandCard key={band.id} band={band} />
        ))}
      </div>
    </main>
  );
}