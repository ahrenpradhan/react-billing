import Link from 'next/link'

export default function Navbar() {
    return (
        <div>
            <ul>
            <li><Link href="/"><a>Home</a></Link></li>    
            <li><Link href="/about"><a>About</a></Link></li>    
            </ul>

            <style jsx>{`
            ul {
                    background: #333;
                    margin:0;
                    color: #fff;
                    list-style: none;
                    display: flex;
            }
            ul li {
                font-size:18px;
                margin-right: 20px;
            }
            ul li a {
                color: #fff;
                text-decoration: none;
            }
            `}</style>
        </div>
    )
}