/* eslint-disable @next/next/no-sync-scripts */
import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';


class MyDocument extends Document {
  static async getInitialProps(ctx) {
    
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
    };
  }
  
  
  
  render() {
    return (
      <Html lang="en">
        <Head>
        <script src="https://cdn.tailwindcss.com"></script>
        
        </Head>
        
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
