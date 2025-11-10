import Link from "next/link"

export default function Home() {
  return(
    <div>
      <h1>Inventory management </h1>
      <button><Link href="/sign-in">  Sign In</Link></button>
      <button>Learn More</button>
    </div>
  )
}
