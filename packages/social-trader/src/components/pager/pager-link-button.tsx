import Link from "components/link/link";
import { useRouter } from "next/router";
import * as querystring from "querystring";
import * as React from "react";

export const _PagerLinkButton: React.FC<Props> = ({
  page,
  className,
  callback,
  value
}) => {
  const { pathname } = useRouter();
  const query = querystring.stringify({ page });
  const link = page === 1 ? pathname : `${pathname}?${query}`;

  return (
    <Link className={className} to={link} onClick={callback}>
      {value}
    </Link>
  );
};
export const PagerLinkButton = React.memo(_PagerLinkButton);
export default PagerLinkButton;

interface Props {
  page: number;
  className?: string;
  callback: (e: any) => void;
  value: string | number;
}
