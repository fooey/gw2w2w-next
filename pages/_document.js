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
					<meta charSet='utf-8' />
					<meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
					<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.6.0/css/font-awesome.min.css' />
					<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto' />
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
