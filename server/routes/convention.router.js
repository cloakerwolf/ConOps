const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectNonAdmin } = require('../modules/isAdminAuthentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


//GET route
//GET route is only for grabbing current convention
router.get('/', rejectUnauthenticated, (req, res) => {
    // console.log('in convention GET route');
    //need to get latest convention, similar to in our attendee routes
    const queryText = `SELECT * FROM "Convention" ORDER BY "ConventionID" DESC LIMIT 1;`;
    pool.query(queryText)
        .then(result => {
            // console.log('convention details:', result.rows[0]);
            res.send(result.rows[0]);
        }).catch(err => {
            // console.log('error in convention GET route:', err);
            res.sendStatus(500);
        })
});

//PUT route
//PUT route for editing current convention (name, dates, etc)
router.put('/', rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
    // console.log('in convention PUT route');
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        const convention = req.body;
        // console.log('convention updates:', convention);
        const queryText = `UPDATE "Convention"
                            SET "OrganizationID" = $1, "ConventionName" = $2, "ConventionStartTime" = $3, "ConventionEndTime" = $4, "ConventionNews" = $5
                            WHERE "ConventionID" = $6;`;
        await connection.query(queryText, [convention.OrganizationID, convention.ConventionName, convention.ConventionStartTime, convention.ConventionEndTime, convention.ConventionNews, convention.ConventionID])
        await connection.query('COMMIT');
        res.sendStatus(200);
    } catch(error) {
        await connection.query('ROLLBACK');
        // console.log('error in convention PUT route:', error);
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});


//POST route
//POST route will create a new convention and then set that one to current!
router.post('/', rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
    // console.log('in convention POST route');
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        const convention = req.body;
        // console.log('creating new convention:', convention);
        const queryText = `INSERT INTO "Convention" ("OrganizationID", "ConventionName", "ConventionStartTime", "ConventionEndTime", "ConventionNews")
                            VALUES ($1, $2, $3, $4, $5);`;
        await connection.query(queryText, [convention.OrganizationID, convention.ConventionName, convention.ConventionStartTime, convention.ConventionEndTime, convention.ConventionNews])
        await connection.query('COMMIT');
        res.sendStatus(200);
    } catch (error) {
        await connection.query('ROLLBACK');
        // console.log('error in convention POST route:', error);
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});

module.exports = router;