import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'

export default function Home() {
	return (
		<div>
			<Navbar />
			<Head>
				<title>Home</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			this is home
		</div>
	);
}
