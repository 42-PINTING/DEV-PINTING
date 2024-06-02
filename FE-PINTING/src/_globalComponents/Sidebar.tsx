import Link from 'next/link';
import styles from '../_globalStyles/Sidebar.module.scss';
import Title from './Titile';
import { FaGithub, FaHeart, FaPen, FaUser, FaSlideshare } from 'react-icons/fa';
import { BsEnvelopePaperHeart } from 'react-icons/bs';
import { LuTreeDeciduous } from 'react-icons/lu';

/**
 * 그리기 == 개인 그림
 * 그림편지 == 게시판
 */

type NavItemProps = {
  href: string;
  text: string;
  icon: React.ReactNode;
};

const navPersonalItems: NavItemProps[] = [
  { href: '/painting', text: '그리기', icon: <FaPen /> },
  {
    href: '/',
    text: '그림 편지',
    icon: <BsEnvelopePaperHeart color='orange' />,
  },
];

const navCoItems = [
  {
    href: '/coDrawing',
    text: '공유 그림',
    icon: <FaSlideshare color='#008000' />,
  },
];

const navPrivateItems = [
  { href: '/profile', text: '프로필', icon: <FaUser color='gray' /> },
];

//TODO: 탭을 선택시 버튼 색상 변경
export default function Sidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ display: 'flex' }}>
      <nav className={styles.nav} id='sidebar'>
        <h2 className={styles.title}>
          <Title.basic />
        </h2>
        <ul className={styles.list}>
          <NavItems list={navPersonalItems} />
          <hr className={styles.line} />
          <NavItems list={navCoItems} />
          <hr className={styles.line} />
          <NavItems list={navPrivateItems} />
          <AttendanceBox />
        </ul>
        <FooterItems />
      </nav>
      <div className={styles.children}>{children}</div>
    </div>
  );
}

function NavItems({ list }: { list: NavItemProps[] }) {
  return list.map((item) => (
    <li key={item.href} className={styles.item} id={`${item.text}`}>
      <Link href={item.href} className={styles.link}>
        <div className={styles.itemIcon}>{item.icon}</div>
        <div className={styles.itemText}>{item.text}</div>
      </Link>
    </li>
  ));
}

function AttendanceBox() {
  return (
    <div className={styles.attendanceBox}>
      <div>출석체크</div>
      <div>
        <LuTreeDeciduous color='#008000' />
      </div>
      <div>
        <FaHeart color='red' />
      </div>
    </div>
  );
}

function FooterItems() {
  return (
    <Link href='https://github.com/42-PINTING' className={styles.footerWrapper}>
      <footer className={styles.footer}>
        <div className={styles.copyright}>
          <FaGithub />
        </div>
        <div className={styles.copyright}>copyright</div>
        <div className={styles.copyright}>reserved</div>
      </footer>
    </Link>
  );
}
