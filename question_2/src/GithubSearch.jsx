import React, { useState } from "react"

const Githubuser = () => {
    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null)
    const [repos, setrepos] = useState([])
    const [error, seterror] = useState("")

    const searchUser = async () => {
        try {
            seterror("")

            const userresult = await fetch(`https://api.github.com/users/${username}`)
            if (!userresult.ok) throw new Error()

            const userdata = await userresult.json()

            const repoRes = await fetch(
                `https://api.github.com/users/${username}/repos?sort=created&per_page=5`
            )
            const userrepo = await repoRes.json()

            setUser(userdata)
            setrepos(userrepo)
        } catch {
            seterror("User not found")
            setUser(null)
            setrepos([])
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold mb-4">
                GitHub User Search
            </h2>

            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter github username"
                className="w-full p-2 border rounded mb-3"
            />

            <button
                onClick={searchUser}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
                Search
            </button>

            {error && (
                <p className="text-red-500 mt-3">
                    {error}
                </p>
            )}

            {user && (
                <div className="mt-5">
                    <img
                        src={user.avatar_url}
                        alt="avatar"
                        className="w-24 h-24 rounded-full mx-auto"
                    />

                    <p className="mt-2 font-semibold">
                        {user.bio || "No bio available"}
                    </p>

                    <p className="mt-1">Public Repos: {user.public_repos}</p>
                    <p>Followers: {user.followers}</p>

                    <ul className="mt-4 text-left">
                        {repos.map(r => (
                            <li key={r.id} className="border-b py-1">
                                {r.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Githubuser