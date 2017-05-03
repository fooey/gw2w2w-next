import React from 'react';
import Link from 'next/link';

// { /*pathname*/ }
export default ({ pathname }) => (
	<nav className="navbar navbar-toggleable-md navbar-light bg-faded">
		<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>
		<Link href="/"><a className="navbar-brand" href="#">Navbar</a></Link>

		<div className="collapse navbar-collapse" id="navbarSupportedContent">
			<ul className="navbar-nav ml-auto">
				<li className="nav-item active">
					<Link href="/"><a className="nav-link">{pathname}</a></Link>
				</li>
				<li className="nav-item">
					<Link href="/link"><a className="nav-link">Link</a></Link>
				</li>
				<li className="nav-item">
					<Link href="/disabled"><a className="nav-link">Disabled</a></Link>
				</li>
			</ul>
		</div>
	</nav>
);
