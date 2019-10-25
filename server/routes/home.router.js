const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectNonAdmin } = require('../modules/isAdminAuthentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// this is the router to edit the NEWS on the home page of the application

// GET route for news
router.get('/', rejectUnauthenticated, (req, res) => {
    queryText = `SELECT "ConventionNews" FROM "Convention" WHERE "ConventionID" = (SELECT MAX("ConventionID") FROM "Convention");`;
    pool.query(queryText)
        .then((results) => {
            // console.log('results from news GET', results.rows[0]);
            res.send(results.rows[0]);
        })
        .catch((error) => {
            // console.log('error in news GET route', error);
            res.sendStatus(500);
        })
})

// PUT route for news
router.put('/edit', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
    // console.log('in NEWS PUT ROUTE, req.body:', req.body);
    const queryText = `UPDATE "Convention" SET "ConventionNews" = $1 WHERE "ConventionID" = (SELECT MAX("ConventionID") FROM "Convention");`;
    pool.query(queryText, [req.body.ConventionNews])
    .then(result => {
        res.sendStatus(201);
    })
    .catch( error => {
        // console.log('error in Server side NEWS PUT', error);
        res.sendStatus(500);
    })
})

module.exports = router;