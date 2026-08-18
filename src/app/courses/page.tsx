type Course = {
  id: number;
  code: string;
  title: string;
  credits: number;
  isOpen: boolean;
};

const courses: Course[] = [
  { id: 1, code: "10301231", title: "Web Technology", credits: 3, isOpen: true },
  { id: 2, code: "10301123", title: "Database Systems", credits: 3, isOpen: false },
  { id: 3, code: "10301456", title: "Data Structures and Algorithms", credits: 3, isOpen: true },
  { id: 4, code: "10301789", title: "Software Engineering", credits: 3, isOpen: true },
  { id: 5, code: "10301012", title: "Computer Networks", credits: 3, isOpen: false },
];

export default function CoursesPage() {
  return (
    <main className="page">
      <header className="courses-header">
        <h1>รายวิชาทั้งหมด</h1>
        <p>รายการวิชาที่เปิดสอนและรายละเอียดการลงทะเบียนประจำปีการศึกษา</p>
      </header>

      <section className="courseGrid">
        {courses.map((course) => (
          <article key={course.id} className="courseCard">
            <div className="card-top">
              <span className="course-code">{course.code}</span>
              <span className={`status-badge ${course.isOpen ? "open" : "closed"}`}>
                {course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}
              </span>
            </div>
            
            <h2 className="course-title">{course.title}</h2>
            
            <div className="card-footer">
              <span className="credits">{course.credits} หน่วยกิต</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}