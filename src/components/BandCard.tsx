import Image from "next/image";
import { Band } from "@/types/band";

type BandCardProps = {
  band: Band;
};

export default function BandCard({ band }: BandCardProps) {
  return (
    <div
      style={{
        backgroundColor: "#0b3b24",
        color: "white",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "420px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "250px", 
          backgroundColor: "#d1d5db",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {band.coverImage ? (
          <Image
            src={band.coverImage}
            alt={band.name}
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#000" }}>
            รูปวง
          </span>
        )}
      </div>

      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: "bold", marginBottom: "8px" }}>
            {band.name}

          </h2>
          <hr style={{ borderColor: "rgba(255,255,255,0.2)", marginBottom: "8px" }} />
          <p style={{ fontSize: "0.9rem", fontWeight: "600", margin: "4px 0" }}>
            แนวเพลง : {band.genre}
          </p>
          <p style={{ fontSize: "0.9rem", fontWeight: "600", margin: "4px 0" }}>
            เพลงฮิต : {band.hitSong}
          </p>

          <hr style={{ borderColor: "rgba(255,255,255,0.2)", margin: "8px 0" }} />
          <div style={{ margin: "6px 0" }}>
          <div style={{ fontWeight: "bold", fontSize: "1rem", marginBottom: "2px" }}>
          ประวัติ 
          </div>
          <div style={{ fontWeight: "normal", fontSize: "0.85rem", color: "#e5e7eb", lineHeight: "1.4" }}>
          {band.history}
          </div>
          </div>
          
          <hr style={{ borderColor: "rgba(255,255,255,0.2)", margin: "8px 0" }} />
          <p style={{ fontSize: "0.9rem", fontWeight: "600", marginBottom: "8px" }}>
            สมาชิก
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
          {band.members.map((member) => (
            <div
              key={member.id}
              style={{
                position: "relative",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#e5e7eb",
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "0.75rem",
                overflow: "hidden",
                border: "2px solid white",
              }}
            >
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                "รูป"
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}