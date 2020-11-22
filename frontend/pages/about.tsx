import Head from 'next/head';
import Navbar from '../components/Navbar';

function About() {
	return (
		<div>
			<Head>
				<title>About</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Navbar />
			About
		</div>
	);
}

export default About;
