/* Marks a block for the arrival animation. The stylesheet hides it before paint
   and the script brings it in; with JavaScript off, the noscript rule shows it. */
export default function Reveal({ as: Tag = "div", stagger = false, className, children, ...rest }) {
  const flag = stagger ? { "data-reveal-group": "" } : { "data-reveal": "" };
  return <Tag className={className} {...flag} {...rest}>{children}</Tag>;
}
