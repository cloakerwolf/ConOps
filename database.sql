--DATABASE is named ConOps--

--The user table holds encripted password and username and authorization level-- 
CREATE TABLE "user"

(

    "id" SERIAL PRIMARY KEY,

    "username" VARCHAR(80) UNIQUE NOT NULL,

    "password" VARCHAR(1000) NOT NULL,

    "authorization" INT

);


--Attendees table holds all of these attendees info--
CREATE TABLE "Attendee"

(

    "AttendeeID" SERIAL NOT NULL,

    "ConventionID" INTEGER NOT NULL,

    "LastName" VARCHAR(255) NOT NULL,

    "FirstName" VARCHAR(255) NOT NULL,

    "MiddleName" VARCHAR(255) NOT NULL,

    "AddressLineOne" VARCHAR(255),

    "AddressLineTwo" VARCHAR(255),

    "City" VARCHAR(255) NOT NULL,

    "StateProvince" VARCHAR(255) NOT NULL,

    "PostalCode" VARCHAR(255) NOT NULL,

    "CountryID" VARCHAR(255) NOT NULL,

    "EmailAddress" VARCHAR(255) NOT NULL,

    "PhoneNumber" VARCHAR(255) NOT NULL,

    "DateOfBirth" DATE NOT NULL,

    "BadgeName" VARCHAR(255) NOT NULL,

    "RegistrationDate" TIMESTAMP NOT NULL,

    "CheckInDate" TIMESTAMP,

    "PaymentDate" TIMESTAMP,

    "BadgeTypeID" INTEGER NOT NULL,

    "BadgeNumber" VARCHAR(255) NOT NULL,

    "printed" BOOLEAN NOT NULL,

    "DiscordVerified" BOOLEAN NOT NULL,

    "PreRegSortNumber" INTEGER,

    "orderID" INTEGER,

    CONSTRAINT "Attendee_pk" PRIMARY KEY ("AttendeeID")

)

WITH(

  OIDS=FALSE

);


-- holds all the conventions info--
CREATE TABLE "Convention"

(

    "ConventionID" SERIAL NOT NULL,

    "OrganizationID" INTEGER,

    "ConventionName" VARCHAR(255) NOT NULL,

    "ConventionStartTime" TIMESTAMP NOT NULL,

    "ConventionEndTime" TIMESTAMP NOT NULL,

    "ConventionNews" VARCHAR(255),

    CONSTRAINT "Convention_pk" PRIMARY KEY ("ConventionID")

)

WITH (

  OIDS=FALSE

);


-- holds all the events information--
CREATE TABLE "Event"

(

    "EventID" SERIAL NOT NULL,

    "ConventionID" INTEGER NOT NULL,

    "EventName" VARCHAR(255) NOT NULL,

    "EventStartTime" TIMESTAMP
    WITH TIME ZONE NOT NULL,

    "EventEndTime" TIMESTAMP
    WITH TIME ZONE NOT NULL,

    "LocationID" INTEGER NOT NULL,

    "IsCancelled" BOOLEAN NOT NULL,

    "EventDescription" VARCHAR
    (255) NOT NULL,

    "SponsorID" INTEGER,

    "DateCreated" TIMESTAMP
    WITH TIME ZONE NOT NULL,

    "DateLastModified" TIMESTAMP
    WITH TIME ZONE,

    "EventModifiedNotes" VARCHAR
    (255),

    CONSTRAINT "Event_pk" PRIMARY KEY
    ("EventID")

)

    WITH
    (

  OIDS=FALSE

);


-- a joint table between events and tags -- 
    CREATE TABLE "EventTags"

    (

        "EventTagsID" SERIAL NOT NULL,

        "Event_ID" INTEGER NOT NULL,

        "Tag_ID" INTEGER NOT NULL,

        CONSTRAINT "EventTags_pk" PRIMARY KEY ("EventTagsID")

    )

    WITH (

  OIDS=FALSE

);


-- holds all the tags information -- 
    CREATE TABLE "Tags"

    (

        "TagID" SERIAL NOT NULL,

        "TagName" VARCHAR(255) NOT NULL,

        "TagIsActive" boolean DEFAULT true,

        CONSTRAINT "Tags_pk" PRIMARY KEY ("TagID")

    )

    WITH (

  OIDS=FALSE

);


-- holds all  the badge type info--
    CREATE TABLE "BadgeType"

    (

        "BadgeTypeID" SERIAL NOT NULL,

        "BadgeTypeDescription" VARCHAR(255) NOT NULL,

        "isAvailableForSelfRegistration" BOOLEAN NOT NULL,

        CONSTRAINT "BadgeType_pk" PRIMARY KEY ("BadgeTypeID")

    )

    WITH (

  OIDS=FALSE

);


-- holds all  the location information -- 
    CREATE TABLE "Location"

    (

        "LocationID" SERIAL NOT NULL,

        "LocationName" VARCHAR (255) NOT NULL,

        "LocationDescription" VARCHAR(255) NOT NULL,

        "LocationIsActive" BOOLEAN NOT NULL,

        CONSTRAINT "Location_pk" PRIMARY KEY ("LocationID")

    )

    WITH (

  OIDS=FALSE

);



    CREATE TABLE "ConventionSponsor"

    (

        "ConventionSponsorID" SERIAL NOT NULL,

        "Convention_ID" INTEGER NOT NULL,

        "SponsorID" INTEGER NOT NULL,

        CONSTRAINT "ConventionSponsor_pk" PRIMARY KEY ("ConventionSponsorID")

    )

    WITH (

  OIDS=FALSE

);


-- holds all sponsor information-- 
    CREATE TABLE "Sponsor"

    (

        "SponsorID" SERIAL NOT NULL,

        "SponsorName" VARCHAR(255) NOT NULL,

        "AmountPaid" VARCHAR(255) NOT NULL,

        "Website" VARCHAR(255) NOT NULL,

        "Notes" VARCHAR(255),

        "SponsorIsActive" BOOLEAN NOT NULL,

        CONSTRAINT "Sponsor_pk" PRIMARY KEY ("SponsorID")

    )

    WITH (

  OIDS=FALSE

);


-- holds the order id probably connects to one of there existing database tables that hold important attendee info--
    CREATE TABLE "Order"

    (

        "OrderID" SERIAL PRIMARY KEY NOT NULL

    );


-- Organization table holds all information regarding Organizations--
    CREATE TABLE "Organization"

    (

        "OrganizationID" SERIAL NOT NULL,

        "OrganizationName" VARCHAR(255) NOT NULL,

        CONSTRAINT "Organization_pk" PRIMARY KEY ("OrganizationID")

    )

    WITH (

  OIDS=FALSE

);

-- all the commands to connect all tables that need to be connected--

    ALTER TABLE "Attendee" ADD CONSTRAINT "Attendee_fk0" FOREIGN KEY ("ConventionID") REFERENCES "Convention"("ConventionID");

    ALTER TABLE "Attendee" ADD CONSTRAINT "Attendee_fk1" FOREIGN KEY ("BadgeTypeID") REFERENCES "BadgeType"("BadgeTypeID");

    ALTER TABLE "Attendee" ADD CONSTRAINT "Attendee_fk2" FOREIGN KEY ("orderID") REFERENCES "Order"("OrderID");



    ALTER TABLE "Convention" ADD CONSTRAINT "Convention_fk0" FOREIGN KEY ("OrganizationID") REFERENCES "Organization"("OrganizationID");



    ALTER TABLE "Event" ADD CONSTRAINT "Event_fk0" FOREIGN KEY ("ConventionID") REFERENCES "Convention"("ConventionID");

    ALTER TABLE "Event" ADD CONSTRAINT "Event_fk1" FOREIGN KEY ("LocationID") REFERENCES "Location"("LocationID");

    ALTER TABLE "Event" ADD CONSTRAINT "Event_fk2" FOREIGN KEY ("SponsorID") REFERENCES "Sponsor"("SponsorID");



    ALTER TABLE "EventTags" ADD CONSTRAINT "EventTags_fk0" FOREIGN KEY ("Event_ID") REFERENCES "Event"("EventID");

    ALTER TABLE "EventTags" ADD CONSTRAINT "EventTags_fk1" FOREIGN KEY ("Tag_ID") REFERENCES "Tags"("TagID");



    ALTER TABLE "ConventionSponsor" ADD CONSTRAINT "ConventionSponsor_fk0" FOREIGN KEY ("Convention_ID") REFERENCES "Convention"("ConventionID");

    ALTER TABLE "ConventionSponsor" ADD CONSTRAINT "ConventionSponsor_fk1" FOREIGN KEY ("SponsorID") REFERENCES "Sponsor"("SponsorID");



    -- ** FOR THESE EXAMPLES TO WORK, SERIAL IDS MUST START FROM 1, YOU MIGHT NEED TO CHANGE AFTER YOU INSERT **--



    --CONVENTIONS--

    INSERT INTO "Convention"
        ("ConventionName", "ConventionStartTime", "ConventionEndTime", "ConventionNews")

    VALUES
        ('2dCon.20 the 2D-Reconening', '8/20/2018', '08/25/2018', 'Pizza Party in the lobby nerds.  Come get some'),
        ('2dCon 2019: The weird gets weirder', '8/20/2019', '8/25/2019', 'Probably going to have to update these at some point!'),
        ('2dCon 2020: Remaster' , '8/20/2020', '8/25/2020', 'THE FUTURE WAS NOW');



    --BADGE TYPES--

    INSERT INTO "BadgeType"
        ("BadgeTypeDescription", "isAvailableForSelfRegistration")

    VALUES
        ('21 plus', true),
        ('under 21', true),
        ('VIP', false);



    --ORDERS--

    INSERT INTO "Order"
        ("OrderID")

    VALUES
        (1),
        (2),
        (3),
        (4);



    --Walkin Attendee who has checked in--

    INSERT INTO "Attendee"
        ("ConventionID", "LastName", "FirstName", "MiddleName", "AddressLineOne", "AddressLineTwo", "City", "StateProvince", "PostalCode", "CountryID", "EmailAddress", "PhoneNumber", "DateOfBirth", "BadgeName", "RegistrationDate", "CheckInDate", "PaymentDate", "BadgeTypeID", "BadgeNumber", "printed", "DiscordVerified", "PreRegSortNumber", "orderID")

    VALUES
        (1, 'OBannon', 'Chris', 'Ryan', '123 fakestreet', 'apartment 2', 'Savage', 'MN', '55378', 'United States', 'crobwan@gmail.com', '612-750-6236', '04/21/1990', 'pantspoopers', '08/23/2018', '08/23/2018', '08/23/2018', 2, '2020', false, false, '2', null),
        (3, 'Decalan', 'Berniedividisde', 'patrick', '789 dummdatalane', 'here', 'townmane', 'Quebec', '55676', 'Canada eh', 'declanB@gmail.com', '555-555-5555', '04/19/1999', 'mapleleaf', '08/22/2020', '08/22/2020', '08/22/2020', 2, '2025', true, true, 4, null);



    --Walkinin Attendee who has not checked in--

    INSERT INTO "Attendee"
        ("ConventionID", "LastName", "FirstName", "MiddleName", "AddressLineOne", "AddressLineTwo", "City", "StateProvince", "PostalCode", "CountryID", "EmailAddress", "PhoneNumber", "DateOfBirth", "BadgeName", "RegistrationDate", "BadgeTypeID", "BadgeNumber", "printed", "DiscordVerified", "PreRegSortNumber", "orderID")

    VALUES
        (3, 'Marit', 'Zelinsky', '??', '123 fakestreet', 'apartment 2', 'Tonka', 'MN', '55345', 'United States', 'Zlinksy@gmail.com', '612-555-5555', '06/21/1992', 'hockey is cool', '08/23/2020', 1, '2026', false, false, '5', null);



    --pregistered attendees who have not yet checked in--

    INSERT INTO "Attendee"
        ("ConventionID", "LastName", "FirstName", "MiddleName", "AddressLineOne", "AddressLineTwo", "City", "StateProvince", "PostalCode", "CountryID", "EmailAddress", "PhoneNumber", "DateOfBirth", "BadgeName", "RegistrationDate", "PaymentDate", "BadgeTypeID", "BadgeNumber", "printed", "DiscordVerified", "PreRegSortNumber", "orderID")

    VALUES
        (3, 'OBannnon', 'Chris', 'Ryan', '123 fakestreet', 'apartment 2', 'Savage', 'MN', '55378', 'United States', 'crobwan@gmail.com', '612-750-6236', '04/21/1990', 'pottytrained', '08/22/2019', '08/22/2019', 1, '2021', true, true, '3', '1'),
        (3, 'Smith', 'Alex', 'Smitty', '456 notreal lane', 'apartment 2', 'Minnetonka', 'MN', '55345', 'UNITED STATES', 'rodrigo321$gmail.com', '555-555-555', '10/13/1991', 'pottytrained', '08/22/2019', '08/22/2019', 1, '2022', true, true, '3', '1'),
        (3, 'Dustin', 'Fedie', 'guy', '4545 notrealave', 'basmenet', 'Saint Paul', 'MN', '55401', 'United STates', 'dustinisgreat@gamil.com', '555-555-55555', '11/22/1986', 'verysmart', '06/19/2020', '06/19/2020', 1, '2023', true, true, '3', '2');



    --preregisterd attendees who have checked in--

    INSERT INTO "Attendee"
        ("ConventionID", "LastName", "FirstName", "MiddleName", "AddressLineOne", "AddressLineTwo", "City", "StateProvince", "PostalCode", "CountryID", "EmailAddress", "PhoneNumber", "DateOfBirth", "BadgeName", "RegistrationDate", "CheckInDate", "PaymentDate", "BadgeTypeID", "BadgeNumber", "printed", "DiscordVerified", "PreRegSortNumber", "orderID")

    VALUES
        (3, 'Dubois', 'Andrew', 'Jamal', '123 fakestreet', 'apartment 2', 'Savage', 'MN', '55378', 'United States', 'doobers@gmail.com', '612-555-5555', '09/30/1989', 'dorkstuff', '04/23/2020', '08/23/2020', '04/23/2020', 1, '2026', true, false, '7', '1'),
        (3, 'Dane', 'Smith', 'Donald', '2020 pretendplace', 'apt 3', 'NorthEast', 'MN', '55403', 'United States', 'DainBSmith@gmail.com', '555-555-5555', '05/05/1984', 'primestuff', '06/01/2020', '08/20/202', '06/01/2020', 1, '2028', true, true, '8', '3');



    --LOCATIONS--

    INSERT INTO "Location"
        ("LocationName", "LocationDescription", "LocationIsActive")

    VALUES
        ('Panel Room', 'Lakeshore B', false),
        ('Kids Corner', 'Regency Ballroom', false),
        ('Tabletop', 'Exhibition Hall', false),
        ('Arcade', 'Exhibition Hall', false),
        ('Console State', 'Greenway Ballroom', false),
        ('LAN Area', 'Exhibition Hall', false),
        ('Main Stage', 'Main Stage', false),
        ('Tournament Room', 'Lakeshore A', false);



    --TAGS--

    INSERT INTO "Tags"
        ("TagName")

    VALUES
        ('Fan Run'),
        ('Panel'),
        ('Guests'),
        ('Family Friendly'),
        ('PS4');



    --SPONSORS--

    INSERT INTO "Sponsor"
        ("SponsorName", "AmountPaid", "Website", "SponsorIsActive")

    VALUES
        ('Level Up Games', '2,000', 'https://www.levelupgamesmn.com/', false),
        ('Highlander Games', '5,000', 'http://highlandergamesmn.com/', false),
        ('Paradise Arcade Shop', '3,000', 'https://paradisearcadeshop.com', false),
        ('Anime Twin Cities', '4,000', 'https://www.animetwincities.org/', false),
        ('Discord', '20,000', 'https://discordapp.com/', false),
        ('Twitch', '30,000', 'https://www.twitch.tv/2dcon', false);



    --SPONSORS W/ NOTES

    INSERT INTO "Sponsor"
        ("SponsorName", "AmountPaid", "Website", "Notes", "SponsorIsActive")

    VALUES
        ('Up Down Minneapolis', '6,000', 'https://www.updownarcadebar.com/minneapolis/', 'donating an arcade game this year!', false);



    --EVENTS--

    INSERT INTO "Event"
        ("ConventionID", "EventName", "EventStartTime", "EventEndTime", "LocationID", "IsCancelled", "EventDescription", "DateCreated")

    VALUES
        ('1', 'Gamer Yoga', '08/23/2018 1:00 PM', '08/23/2018 2:00 PM', '2', 'FALSE', 'Want to level up your body at the same time you level up your game? Join us at the kids corner (all ages welcome) and bring your favorite gaming controller or handheld gaming device to experience gaming in the here and now.', '08/22/2018'),
        ('2', 'Century: Spice Road Trip Tournament', '08/25/2019 2:00 PM', '08/25/2019 6:00 PM', '3', 'FALSE', 'Century: Spice Road is the first in a series of games that explores the history of each century with spice-trading as the theme for the first installment.', '08/03/2019'),
        ('3', 'Tekken 7', '08/26/2020 1:00 PM', '08/26/2020 6:00 PM', '8', 'FALSE', 'Tekken 7!', '07/27/2020');



    --SPONSORED EVENTS--

    INSERT INTO "Event"
        ("ConventionID", "EventName", "EventStartTime", "EventEndTime", "LocationID", "IsCancelled", "EventDescription", "SponsorID", "DateCreated")

    VALUES
        ('3', 'Counterstrike: GO', '08/26/2020 2:00 PM', '08/26/2020 6:00 PM', '6', 'FALSE', 'GO!', '6', '05/20/2020');



    --CONVENTIONS SPONSOR JUNCTION TABLE--

    INSERT INTO "ConventionSponsor"
        ("Convention_ID", "SponsorID")

    VALUES
        ('1', '2'),
        ('2', '3'),
        ('3', '4'),
        ('3', '5'),
        ('3', '6'),
        ('3', '7');



    --CANCELLED EVENTS--

    INSERT INTO "Event"
        ("ConventionID", "EventName", "EventStartTime", "EventEndTime", "LocationID", "IsCancelled", "EventDescription", "DateCreated")

    VALUES
        ('3', 'Marvel Vs. Capcom 2', '08/24/2020 2:00 PM', '08/24/2020 5:00 PM', '4', 'TRUE', 'wow!', '08/22/2020');



    --MODIFIED EVENTS--

    INSERT INTO "Event"
        ("ConventionID", "EventName", "EventStartTime", "EventEndTime", "LocationID", "IsCancelled", "EventDescription", "DateCreated", "DateLastModified", "EventModifiedNotes")

    VALUES
        ('3', 'Dragon Ball FighterZ', '08/24/2020 2:00 PM', '08/24/2020 5:00 PM', '4', 'FALSE', 'haha!', '08/22/2020', '08/23/2020', 'please ensure all our guest keep it in under control');



    --EVENT TAGS--

    INSERT INTO "EventTags"
        ("Event_ID", "Tag_ID")

    VALUES
        ('9' , '4'),
        ('10', '5'),
        ('9', '1'),
        ('12', '1');
