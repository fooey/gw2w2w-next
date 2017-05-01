import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
	static getInitialProps({renderPage}) {
		const page = renderPage();

		return { ...page };
	}

	render() {
		return (
			<html>
				<Head>
					<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/css/bootstrap-grid.min.css'/>
				</Head>
				<body>
					{this.props.customValue}
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
