const express = require('express');
const axios = require('axios');

const app = express();
const port = 8000;

function formatRepoData(repo) {
  const owner = repo.owner.login;
  const name = repo.name;
  const createdAt = repo.created_at.replace(/T|Z/g, ' ').trim(); // Remove 'T' and 'Z' from the ISO 8601 format
  const stars = repo.stargazers_count;
  const forks = repo.forks_count;

  return {
    owner,
    name,
    createdAt,
    stars,
    forks,
    html_url: repo.html_url
  };
}

app.get('/get_popular_repos', async (req, res) => {
  const organization = req.query.organization;
  const language = req.query.language || 'java';

  if (!organization) {
    res.status(400).json({ error: 'Organization not provided.' });
    return;
  }

  const url = `https://api.github.com/search/repositories?q=user:${organization}+language:${language}&sort=stars&order=desc`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.items && data.items.length > 0) {
      const repos = data.items.map((repo) => formatRepoData(repo));
      res.json(repos);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve repositories, organization may not exist or repositories are private.' });
  }
});

app.use(express.static('frontend'));

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
