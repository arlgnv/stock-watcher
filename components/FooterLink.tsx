import Link from 'next/link';

interface Props {
  text: string;
  linkText: string;
  href: string;
}

function FooterLink({ text, linkText, href }: Props) {
  return (
    <div className="pt-4 text-center">
      <p className="text-sm text-gray-500">
        {text}{' '}
        <Link className="footer-link" href={href}>
          {linkText}
        </Link>
      </p>
    </div>
  );
}

export default FooterLink;
