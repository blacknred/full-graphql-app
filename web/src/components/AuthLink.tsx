
import Link from 'next/link';
import React from 'react';
import {
  useMeQuery
} from '../typings';

interface IProps {
  href: string
}

const AuthLink: React.FC<IProps> = ({ children, href }) => {
  const [{ data }] = useMeQuery();

  return <Link href={data?.me ? href : `/login?next=${href}`}>{children}</Link>;
}

export default AuthLink