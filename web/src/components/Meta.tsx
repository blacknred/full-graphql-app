import Head from 'next/head';
interface IProps {
  title?: any,
  keywords?: string,
  description?: string
}

const defaultProps = {
  title: '',
  keywords: '',
  description: ''
}

const Layout = ({ title, keywords, description }: IProps & typeof defaultProps) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
}

Layout.defaultProps = defaultProps;

export default Layout;