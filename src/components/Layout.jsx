import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

/* The whole document body. Rendered once per route at build time; the browser
   receives the finished page and a small script that only adds motion. */
export default function Layout({ route, children }) {
  const crumbs = route.path === "/" ? null : route.crumb;
  return (
    <>
      <div className="field-parallax" aria-hidden="true"><div className="field" /></div>
      <div className="grain" aria-hidden="true" />
      <div className="shell">
        <a className="skip" href="#main">Skip to content</a>
        <div className="progress" aria-hidden="true" />
        <Header path={route.path} crumb={crumbs} />
        <main id="main">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
