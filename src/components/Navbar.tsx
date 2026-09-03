import Link from "next/link";
import Image from "next/image"
import logoImg from "../image_mine/mju-Student_Course_Hub-removebg-preview.png";

export default function Navbar() {
  return (
    <header className="siteHeader">
      <div className="navbarContainer">
        <Link href="/" className="brandLogo">
          <div>

      <Image 
        src={logoImg} 
        alt="MJU Student Course Hub Logo" 
        
      />
    </div>
        </Link>

        <nav aria-label="เมนูหลัก">
          <ul className="navList">
            <li>
              <Link className="navLink" href="/">
                หน้าแรก
              </Link>
            </li>
            <li>
              <Link className="navLink" href="/courses">
                รายวิชา
              </Link>
            </li>
            <li>
              <Link className="navLink" href="/about">
                เกี่ยวกับเรา
              </Link>
            </li>
            <li>
              <Link className="navLink" href="/bands">
                วงดนตรี
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}