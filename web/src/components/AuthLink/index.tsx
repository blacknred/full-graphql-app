
import Link from 'next/link';
import React from 'react';
import { useGetAuthQuery } from '../../types';

interface IProps {
  href: string
}

const AuthLink: React.FC<IProps> = ({ children, href }) => {
  const [{ data }] = useGetAuthQuery();

  return <Link href={data?.getAuth ? href : `/login?next=${href}`}>{children}</Link>;
}

export default AuthLink