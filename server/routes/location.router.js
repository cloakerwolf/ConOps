const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectNonAdmin } = require('../modules/isAdminAuthentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// locations router, for setting locations tied to events

// GET route for all locations.
router.get('/', rejectUnauthenticated, (req, res) => {
        let queryText = `SELECT * FROM "Location"`
        pool.query(queryText)
            .then((result)  => {
                // console.log('in locations GET router:', result);
                res.send(result.rows);
            })
            .catch((error) => {
                // console.log('error in locations GET router:', error);
                res.sendStatus(500);
            })
});

// GET route for specific location itself
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
    const id = req.params.id
    // console.log('in location details get id:', id);
    const queryText = `SELECT * FROM "Location" WHERE "LocationID" = $1;`;
    pool.query(queryText, [id])
        .then(result => {
            // console.log('location details:', result.rows[0]);
            res.send(result.rows[0]);
        })
        .catch(error => {
            // console.log('error in location details router:', error)
            res.sendStatus(500);
        })
});

// POST route for adding new location
router.post('/', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
    const location = req.body;
    // console.log('creates new location:', location);
    let queryText = `INSERT INTO "Location" ("LocationName", "LocationDescription", "LocationIsActive") VALUES ($1, $2, 'TRUE');`;
    pool.query(queryText, [location.LocationName, location.LocationDescription])
    .then(result => {
        res.sendStatus(201);
    })
    .catch(error => {
        // console.log('error in creating new location router:', error)
        res.sendStatus(500);
    })
});

// PUT route for editing a location
router.put('/details/:id', rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        const id = req.params.id;
        const location = req.body;
        // console.log('in location put route:', location)
        const queryText = `UPDATE "Location" SET "LocationName" = $1, "LocationDescription" = $2, "LocationIsActive" = $3 WHERE "LocationID" = $4`
        await connection.query(queryText, [location.LocationName, location.LocationDescription, location.LocationIsActive, id]);
        await connection.query('COMMIT');
    } catch {
        res.sendStatus(500);
    } finally {
        connection.release
    }
})

module.exports = router;