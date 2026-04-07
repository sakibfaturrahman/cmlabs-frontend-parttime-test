// src/components/molecules/FooterLinkGroup.tsx
interface FooterLinkGroupProps {
  title: string;
  links: string[];
}

export const FooterLinkGroup = ({ title, links }: FooterLinkGroupProps) => (
  <div className="flex flex-col gap-4">
    <h4 className="text-white font-black uppercase tracking-widest text-sm">
      {title}
    </h4>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link}>
          <a
            href="#"
            className="text-white/60 hover:text-orange-400 transition-colors text-sm font-medium"
          >
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
