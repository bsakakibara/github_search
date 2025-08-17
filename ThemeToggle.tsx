import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"

const ThemeToggle = () => {
    const [dark, setDark] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("theme") === "dark") {
            document.documentElement.classList.add("dark")
            setDark(true)
        }
    }, [])

    const toggleTheme = () => {
        if (dark) {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
            setDark(false)
        } else {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
            setDark(true)
        }
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-md 
            shadow-md hover:scale-110 transition-all"
        >
            {dark ? (
                <FontAwesomeIcon icon={faSun} className="text-yellow-400" />
            ) : (
                <FontAwesomeIcon icon={faMoon} className="text-blue-400" />
            )}
        </button >
    )
}

export default ThemeToggle
