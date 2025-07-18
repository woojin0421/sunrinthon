

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <Link to="/">홈</Link>
        <Link to="/my">레시피</Link>
        <Link to="/community">커뮤니티</Link>
        <Link to="/my">마이페이지</Link>
    </footer>
  );
}
export default Footer;