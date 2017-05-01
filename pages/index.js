import React from 'react';

import App from '../components/App';
import Header from '../components/Header';
import Matches from '../components/Matches';
import withData from '../lib/withData';

import stylesheet from '../styles/index.scss';

export default withData((props) => (
	<App>
		<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
		<Header pathname={props.url.pathname}/>
		<Matches/>
	</App>
));
