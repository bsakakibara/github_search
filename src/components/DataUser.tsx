import type { TypesProps } from "../types/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

const DataUser = ({
    login,
    location,
    avatar_url,
    followers,
    following,
    email,
    bio
}: TypesProps) => {
    return (
        <div className="w-full max-w-md mx-auto p-6 rounded-2xl bg-white/10 dark:bg-black/20
        backdrop-blur-md shadow-lg border border-white/20 flex flex-col items-center text-center">

            <img
                src={avatar_url}
                alt={login}
                className="w-60 h-60 rounded-full border-4 border-primary shadow-md mb-4"
            />

            <h3 className="text-xl font-bold text-primary mb-2">{login}</h3>

            <div className="w-full flex flex-col gap-2 text-sm text-foreground/70">
                {location &&
                    <p className="flex items-center justify-center gap-2">
                        <FontAwesomeIcon icon={faLocationDot} className="text-primary" />
                        {location}
                    </p>}
                {email &&
                    <p className="flex items-center justify-center gap-2">
                        <FontAwesomeIcon icon={faEnvelope} className="text-primary" />
                        {email}
                    </p>}
            </div>

            {bio &&
                <p className="mt-4 text-foreground/90 italic text-sm sm:text-base bg-background/50 px-4 py-2 rounded-lg shadow-inner">
                    Bio:
                    {bio}
                </p>}

            <div className="grid grid-cols-2 gap-4 mt-6 w-full">
                <div className="p-4 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 shadow-md">
                    <p className="text-lg font-semibold">{followers}</p>
                    <p className="text-xs text-foreground/60">Seguidores</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-secondary/20 to-primary/20 shadow-md">
                    <p className="text-lg font-semibold">{following}</p>
                    <p className="text-xs text-foreground/60">Seguindo</p>
                </div>
            </div>
        </div>
    )
}

export default DataUser