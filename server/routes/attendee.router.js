const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectNonAdmin } = require('../modules/isAdminAuthentication-middleware');
const { rejectNonCheckIn } = require('../modules/isCheckInAuthentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//GET ROUTES
//GET routes are ok for all users to see; GET routes won't need to check authorization. they will check authentication.

//GET route for ALL attendees
router.get('/', rejectUnauthenticated, async (req, res) => {
    // console.log('in attendee GET route');
    //go get full list of attendees, make sure to grab from current convention!
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        //this will grab the convention ID that is the biggest; ie, the last created convention
        const queryCon = `SELECT MAX("ConventionID") AS convention FROM "Convention";`;
        //save result so we can use it in the followup query
        const result = await connection.query(queryCon);
        //set a variable to the top con ID
        const conventionId = result.rows[0].convention;
        const queryText = `SELECT * FROM "Attendee" WHERE "ConventionID" = $1 ORDER BY "RegistrationDate" ASC;`;
        //use top con ID to find our attendees for that convention
        const attendeeResult = await connection.query(queryText, [conventionId]);
    
        await connection.query('COMMIT');
        // console.log(attendeeResult.rows);
        res.send(attendeeResult.rows);
    } catch (error) {
        await connection.query('ROLLBACK');
        // console.log('error in attendee GET', error);
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});

//GET route for walk-in attendees, not yet checked-in
router.get('/walk_ins', rejectUnauthenticated, async (req, res) => {
    // console.log('in attendee walk-in GET route');
    //go get walk-in list of attendees, make sure to grab from current convention!
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        //this will grab the convention ID that is the biggest; ie, the last created convention
        const queryCon = `SELECT MAX("ConventionID") AS convention FROM "Convention";`;
        //save result so we can use it in the followup query
        const result = await connection.query(queryCon);
        //set a variable to the top con ID
        const conventionId = result.rows[0].convention;
        //this query grabs the walk ins; no order ID and not checked in yet
        const queryText = `SELECT * FROM "Attendee" WHERE "ConventionID" = $1 AND "orderID" IS NULL AND "CheckInDate" IS NULL;`;
        //use top con ID to find our attendees for that convention
        const attendeeResult = await connection.query(queryText, [conventionId]);
        await connection.query('COMMIT');
        res.send(attendeeResult.rows);
    } catch (error) {
        await connection.query('ROLLBACK');
        // console.log('error in attendee walk-in GET', error);
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});

//GET route for checked-in attendees
router.get('/checked_in', rejectUnauthenticated, async (req, res) => {
    // console.log('in attendee checked-in GET route');
    //go get checked-in list of attendees, make sure to grab from current convention!
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        //this will grab the convention ID that is the biggest; ie, the last created convention
        const queryCon = `SELECT MAX("ConventionID") AS convention FROM "Convention";`;
        //save result so we can use it in the followup query
        const result = await connection.query(queryCon);
        //set a variable to the top con ID
        const conventionId = result.rows[0].convention;
        //this query grabs the walk ins; no order ID and not checked in yet
        const queryText = `SELECT * FROM "Attendee" WHERE "ConventionID" = $1 AND "CheckInDate" IS NOT NULL;`;
        //use top con ID to find our attendees for that convention
        const attendeeResult = await connection.query(queryText, [conventionId]);
        await connection.query('COMMIT');
        res.send(attendeeResult.rows);
    } catch (error) {
        await connection.query('ROLLBACK');
        // console.log('error in attendee walk-in GET', error);
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});

//GET route for preregistered attendees, not yet checked-in
router.get('/pre_registered', rejectUnauthenticated, async (req, res) => {
    // console.log('in attendee checked-in GET route');
    //go get preregistered list of attendees, make sure to grab from current convention!
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        //this will grab the convention ID that is the biggest; ie, the last created convention
        const queryCon = `SELECT MAX("ConventionID") AS convention FROM "Convention";`;
        //save result so we can use it in the followup query
        const result = await connection.query(queryCon);
        //set a variable to the top con ID
        const conventionId = result.rows[0].convention;
        //this query grabs the walk ins; no order ID and not checked in yet
        const queryText = `SELECT * FROM "Attendee" WHERE "ConventionID" = $1 AND "orderID" IS NOT NULL AND "CheckInDate" IS NULL;`;
        //use top con ID to find our attendees for that convention
        const attendeeResult = await connection.query(queryText, [conventionId]);
        await connection.query('COMMIT');
        res.send(attendeeResult.rows);
    } catch (error) {
        await connection.query('ROLLBACK');
        // console.log('error in attendee walk-in GET', error);
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});


//GET route for specific attendee ID. no need to check convention; only active convention is visible/clickable on DOM. 
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
    //declare route id as a variable
    const id = req.params.id;
    // console.log('in attendee details specific GET for ID:', id);
    //no need for async/await, just grabbing ID
    const queryText = `SELECT * FROM "Attendee" WHERE "AttendeeID" = $1;`;
    pool.query(queryText, [id])
        .then(result => {
            // console.log('attendee details:', result.rows[0]);
            res.send(result.rows[0]);
        }).catch(err => {
            // console.log('error in attendee detail get:', err);
            res.sendStatus(500);
        })
});

//GET route for an order ID. again, no need to check convention ID; only active convention on DOM.
router.get('/order/:id', rejectUnauthenticated, (req, res) => {
    //sending order ID as an object for this route
    const id = req.params.id;
    // console.log('in order details specific GET for ID:', id);
    //no need for async/await, just grabbing ID
    const queryText = `SELECT * FROM "Attendee" WHERE "orderID" = $1;`;
    pool.query(queryText, [id])
        .then(result => {
            // console.log('attendee order details:', result.rows);
            res.send(result.rows);
        }).catch(err => {
            // console.log('error in attendee order get:', err);
            res.sendStatus(500);
        })
});

//PUT ROUTES
//PUT routes will need to check authorization

//PUT route for attendee details edit
router.put('/details/:id', rejectUnauthenticated, rejectNonCheckIn, async (req, res) => {
    // console.log('in attendee PUT route');
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        //declare route id as a variable
        const attendeeID = req.params.id;
        const attendee = req.body;
        // console.log('here is attendee:', attendee);
        //update for specific attendee, queryText below
        const queryText =   `UPDATE "Attendee"
                            SET "LastName" = $1, "FirstName" = $2, "MiddleName" = $3, "AddressLineOne" = $4, "AddressLineTwo" = $5, 
                                "City" = $6, "StateProvince" = $7, "PostalCode" = $8, "CountryID" = $9, "EmailAddress" = $10, 
                                "PhoneNumber" = $11, "DateOfBirth" = $12, "BadgeName" = $13, "BadgeTypeID" = $14
                            WHERE "Attendee"."AttendeeID" = $15;`;
        await connection.query(queryText, [attendee.LastName, attendee.FirstName, attendee.MiddleName, attendee.AddressLineOne, attendee.AddressLineTwo, attendee.City, 
                                attendee.StateProvince, attendee.PostalCode, attendee.CountryID, attendee.EmailAddress, attendee.PhoneNumber, attendee.DateOfBirth, 
                                attendee.BadgeName, attendee.BadgeTypeID, attendeeID]);
        await connection.query('COMMIT');
        res.sendStatus(200);
    } catch(error) {
        await connection.query('ROLLBACK');
        // console.log('error in attendee PUT route', error);
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});

//PUT route for check-in, SINGLE or MUTLI check-in. data will come as an array of IDs, even if it's 1 id (because of the client side table)
router.put('/checkIn', rejectUnauthenticated, rejectNonCheckIn, async (req, res) => {
    // console.log('in attendee checkIn PUT route');
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        //assign the array we get to a variable
        const attendees = req.body.attendeesToCheckIn;
        // console.log(attendees);

        const queryText = `UPDATE "Attendee"
                            SET "CheckInDate" = NOW()
                            WHERE "AttendeeID" = $1;`;

        //loop over the array and update checkin where we have an ID = a value in that array
        for (let i = 0; i < attendees.length; i++) {
            // console.log('in checkin PUT LOOOOOOP');
            await connection.query(queryText, [attendees[i]])
        }

        await connection.query('COMMIT');
        res.sendStatus(200);
    } catch(err) {
        await connection.query('ROLLBACK');
        // console.log('error in attendee checkIn PUT route', err);
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});

//PUT route for a single walkin attendee AND a payment. basically same as above, also sets payment date.
router.put('/checkInAndPay', rejectUnauthenticated, rejectNonCheckIn, async (req, res) => {
    // console.log('in attendee checkInAndPay PUT route');
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        //assign the array we get to a variable
        // console.log(req.body);
        
        const attendee = req.body.attendeeToCheckIn;
        // console.log(attendee);

        const queryText = `UPDATE "Attendee"
                            SET "CheckInDate" = NOW(), "PaymentDate" = NOW()
                            WHERE "AttendeeID" = $1;`;

        
        await connection.query(queryText, [attendee])

        await connection.query('COMMIT');
        res.sendStatus(200);
    } catch (err) {
        await connection.query('ROLLBACK');
        // console.log('error in attendee checkInAndPay PUT route', err);
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});

//this is an "undo" of a check-in of an attendee who was a walkin. sets checkin date and payment date to null (walkins have no payment date)
router.put('/checkOutWalkIn', rejectUnauthenticated, rejectNonCheckIn, async (req, res) => {
    // console.log('in attendee checkOutWalkIn PUT route');
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        //assign the array we get to a variable
        // console.log(req.body);

        const attendee = req.body.attendeeToCheckOut;
        // console.log(attendee);

        const queryText = `UPDATE "Attendee"
                            SET "CheckInDate" = NULL, "PaymentDate" = NULL
                            WHERE "AttendeeID" = $1;`;


        await connection.query(queryText, [attendee])

        await connection.query('COMMIT');
        res.sendStatus(200);
    } catch (err) {
        await connection.query('ROLLBACK');
        // console.log('error in attendee checkOutWalkIn PUT route', err);
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});

//this is an "undo" of a check-in of an attendee who was a pre-registered attendee. sets checkin date to null
router.put('/checkOut', rejectUnauthenticated, rejectNonCheckIn, async (req, res) => {
    // console.log('in attendee checkOut PUT route');
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        //assign the array we get to a variable
        // console.log(req.body);

        const attendee = req.body.attendeeToCheckOut;
        // console.log(attendee);

        const queryText = `UPDATE "Attendee"
                            SET "CheckInDate" = NULL
                            WHERE "AttendeeID" = $1;`;


        await connection.query(queryText, [attendee])

        await connection.query('COMMIT');
        res.sendStatus(200);
    } catch (err) {
        await connection.query('ROLLBACK');
        // console.log('error in attendee checkOut PUT route', err);
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});


//Delete route for the Attendee Detail page. in case an admin needs to fully delete an attendee.
router.delete('/delete/:id', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
    const id = req.params.id
    const queryText = 'DELETE FROM  "Attendee" WHERE "AttendeeID" = $1;';
    // console.log('in attendee specific detail delete id', id);
    pool.query(queryText, [id])
        .then((result) => {
            // console.log('in Delete router for specific attendee details', result);
            res.sendStatus(200); 
        })
        .catch((error) => {
            // console.log('in Delete router for specific attendee details', error);
            res.sendStatus(500);
        })
    
})



module.exports = router;