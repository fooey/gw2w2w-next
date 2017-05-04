import React from 'react';

import App from '../components/App';
import Header from '../components/Header';
import Overview from '../components/Overview';
import withData from '../lib/withData';

import stylesheet from '../styles/index.scss';

export default withData((props) => (
	<App>
		<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
		<Header pathname={props.url.pathname}/>
		<Overview/>
	</App>
));
