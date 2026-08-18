import Image from "next/image";

export default function HomePage() {
  const siteName = "Student Course";
  const description = "รายการวิชาที่เปิดสอนในหลักสูตรประจำปีการศึกษา";

  return (
    <main className="page">
      <header className="hero-section">
        <h1>{siteName}</h1>
        <p className="description">{description}</p>
      </header>


      <section className="target-section">
        <h2>เว็บไซต์นี้เหมาะสำหรับใคร?</h2>
        <ul className="target-list">
          <li>นักศึกษาที่ต้องการค้นหารายวิชาและวางแผนการเรียน</li>
          <li>ผู้ที่สนใจตรวจสอบรายละเอียดหน่วยกิตและสถานะการเปิดรับสมัคร</li>
        </ul>
      </section>
    </main>
  );
}