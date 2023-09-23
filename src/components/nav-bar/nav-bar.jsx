import { UserButton } from "@clerk/clerk-react"
import styles from "./nav.module.css"

const Navbar = () => {
  return (
    <div className={styles.container} >
        <div>Chart logger and Analytics</div>
        <UserButton />
    </div>
  )
}

export default Navbar