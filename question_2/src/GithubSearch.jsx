import React, { useState } from "react";

function GithubSearch() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchUser = async (e) => {
    e.preventDefault();
    if (!username) return;

    setLoading(true);
    setError("");
    setUser(null);
    setRepos([]);

    try {
      const userRes = await fetch(
        `https://api.github.com/users/${username}`
      );

      if (userRes.status === 404) {
        throw new Error("User not found");
      }

      const userData = await userRes.json();
      setUser(userData);

      // Fetch latest 5 repos
      const repoRes = await fetch(
        `https://api.github.com/users/${username}/repos?sort=created&per_page=5`
      );

      const repoData = await repoRes.json();
      setRepos(repoData);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>GitHub Search</h1>

      <form onSubmit={searchUser} className="search-box">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {user && (
        <div className="profile-card">
          <img src={user.avatar_url} alt="avatar" />
          <div>
            <h2>{user.login}</h2>
            <p>{user.bio || "No bio available"}</p>
            <p>
              👥 {user.followers} Followers • {user.following} Following •{" "}
              {user.public_repos} Repos
            </p>
          </div>
        </div>
      )}

      {repos.length > 0 && (
        <div className="repo-section">
          <h3>Latest Repositories</h3>
          {repos.map((repo) => (
            <div key={repo.id} className="repo-card">
              {repo.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GithubSearch;
