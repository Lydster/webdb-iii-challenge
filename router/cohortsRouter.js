const router = require("express").Router();
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/cohorts.sqlite3"
  }
};

const db = knex(knexConfig);

router.post("/", (req, res) => {
  db("cohorts")
    .insert(req.body)
    .then(ids => {
      const [id] = ids;
      db("cohorts")
        .where({ id })
        .first()
        .then(cohort => {
          res.status(200).json(cohort);
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/", (req, res) => {
  db("cohorts")
    .then(cohort => {
      res.status(200).json(cohort);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .first()
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({
          message:
            "Could not get cohort of index selected. Bear does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("cohorts")
    .where({ id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "Successfully deleted!" });
      } else {
        res.status(404).json({
          error: "The cohort you are trying to delete does not exist"
        });
      }
    })
    .catch(err => {
      res.status(500).json({ err: "Server error" });
    });
});

router.put("/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        db("cohorts")
          .where({ id: req.params.id })
          .first()
          .then(cohort => {
            res.status(200).json(cohort);
          });
      } else {
        res
          .status(404)
          .json({ error: "Cohort you are trying to update does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
