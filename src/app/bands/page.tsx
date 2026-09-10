import { bands } from "@/data/courses";
import CourseExplorer from "@/components/CourseExplorer";

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

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <CourseExplorer bands={bands} />
      </div>
    </main>
  );
}