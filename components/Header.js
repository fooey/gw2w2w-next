import React from 'react';
import Link from 'next/link';

// { /*pathname*/ }
export default() => (
	<nav className="navbar navbar-toggleable-md navbar-light bg-faded">
		<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>
		<Link href="/"><a className="navbar-brand" href="#">Navbar</a></Link>

		<div className="collapse navbar-collapse" id="navbarSupportedContent">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item active">
					<Link href="/"><a className="nav-link">Home</a></Link>
				</li>
				<li className="nav-item">
					<Link href="/link"><a className="nav-link">Link</a></Link>
				</li>
				<li className="nav-item">
					<Link href="/disabled"><a className="nav-link">Disabled</a></Link>
				</li>
			</ul>
			<form className="form-inline my-2 my-lg-0">
				<input className="form-control mr-sm-2" type="text" placeholder="Search"/>
				<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
			</form>
		</div>
	</nav>
);
