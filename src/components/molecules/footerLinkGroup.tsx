export const FooterLinkGroup = ({
  title,
  links,
}: {
  title: string;
  links: string[];
}) => (
  <div className="space-y-6">
    <h4 className="text-sm font-bold text-gray-900 tracking-tight">{title}</h4>
    <ul className="space-y-4">
      {links.map((link) => (
        <li key={link}>
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-red-600 transition-colors duration-300"
          >
            {link.toLowerCase()}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
