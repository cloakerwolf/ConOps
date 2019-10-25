const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectNonAdmin } = require('../modules/isAdminAuthentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// router for sponsor information

// GET route for all
router.get('/', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "Sponsor"`
    pool.query(queryText)
        .then((result) => {
            // console.log('in sponsors GET router:', result);
            res.send(result.rows);
        })
        .catch((error) => {
            // console.log('error in sponsors GET router:', error)
            res.sendStatus(500)
        })
})

// GET route for specific event
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
    const id = req.params.id
    // console.log('in sponsor details get id:', id);
    const queryText = `SELECT * FROM "Sponsor" WHERE "SponsorID" = $1;`;
    pool.query(queryText, [id])
        .then(result => {
            // console.log('sponsor details:', result.rows[0]);
            res.send(result.rows[0]);
        })
        .catch(error => {
            // console.log('error in sponsor details router:', error)
            res.sendStatus(500);
        })
});


// POST route to add a new sponsor
router.post('/', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
    const sponsor = req.body;
    // console.log('creates new sponsor:', sponsor);
    let queryText = `INSERT INTO "Sponsor" ("SponsorName", "AmountPaid", "Website", "Notes", "SponsorIsActive") VALUES ($1, $2, $3, $4, 'TRUE');`;
    pool.query(queryText, [sponsor.SponsorName, sponsor.AmountPaid, sponsor.Website, sponsor.Notes])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            // console.log('error in creating new sponsor router:', error)
            res.sendStatus(500);
        })
});

// PUT route for sponsors
router.put('/details/:id', rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        const id = req.params.id;
        const sponsor = req.body;
        // console.log('in sponsor put route:', sponsor)
        const queryText = `UPDATE "Sponsor" SET "SponsorName" = $1, "AmountPaid" = $2, "Website" = $3, "Notes" = $4, "SponsorIsActive" = $5 WHERE "SponsorID" = $6`
        await connection.query(queryText, [sponsor.SponsorName, sponsor.AmountPaid, sponsor.Website, sponsor.Notes, sponsor.SponsorIsActive,  id]);
        await connection.query('COMMIT');
    } catch {
        res.sendStatus(500);
    } finally {
        connection.release
    }
})

module.exports = router;