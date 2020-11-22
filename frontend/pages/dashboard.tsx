import Head from 'next/head'
import Navbar from '../components/Navbar'
import ClippedDrawer from '../components/ClippedDrawer'

export default function dashboard() {
	return (
		<div>
			{/* <Navbar /> */}
			<Head>
				<title>Dashboard</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<ClippedDrawer/>
		</div>
	);
}
