const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return res.json(repository);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  const repositoryIndex = repositories.findIndex((item) => item.id === id);

  if (repositoryIndex === -1)
    return res
      .status(400)
      .json({ error: `Repository with id=${id} not exists` });

  repositories[repositoryIndex] = {
    ...repositories[repositoryIndex],
    title,
    url,
    techs,
  };
  return res.json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const repositoryIndex = repositories.findIndex((item) => item.id == id);

  if (repositoryIndex === -1)
    return res
      .status(400)
      .json({ error: `Repository with id=${id} not exists` });

  repositories.splice(repositoryIndex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex((item) => item.id == id);

  if (repositoryIndex === -1)
    return res
      .status(400)
      .json({ error: `Repository with id=${id} not exists` });

  repositories[repositoryIndex].likes = repositories[repositoryIndex].likes + 1;

  //return res.status(200).json(repositories[repositoryIndex]);
  return res.status(200).json({ likes: repositories[repositoryIndex].likes });
});

module.exports = app;
