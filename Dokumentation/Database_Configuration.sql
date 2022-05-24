/* 
* Table to hold information about the user
*/
CREATE TABLE UserT (
    ID INTEGER IDENTITY(1, 1),
    Username VARCHAR(50),
    Password VARCHAR(255),
    Email VARCHAR(100),
    Name VARCHAR(70),
    Birthdate DATE,

    PRIMARY KEY(ID)
);

/*
* Table to hold user stats
*/
CREATE TABLE Stats(
    ID INTEGER,
    Wins INTEGER,
    Lost INTEGER,
    GamesPlayed INTEGER,

    PRIMARY KEY(ID)
);

/*
* Procedure to create a user
*/
CREATE PROCEDURE CreateUserT 
    @Username VARCHAR(50), 
    @Password VARCHAR(255), 
    @Email VARCHAR(100), 
    @Name VARCHAR(70),
    @Birthdate DATE
AS
-- Check that Username or Email exists in the table
IF NOT EXISTS (SELECT 1 FROM UserT WHERE UserT.Username = @Username OR UserT.Email = @Email)
BEGIN
    -- If user isn't in the table, then create user
    INSERT INTO UserT(Username, Password, Email, Name, Birthdate)
    VALUES(@Username, @Password, @Email, @Name, @Birthdate);

    -- Create default user stats out from identity
    INSERT INTO Stats(ID, Wins, Lost, GamesPlayed)
    VALUES(@@IDENTITY, 0, 0, 0);
    -- Return that is was a success
    SELECT 'SUCCESS';
END;
ELSE
    -- If user exist then return error key
    SELECT 'UserExists';


/*
* Procedure to check a password
*/
CREATE PROCEDURE CheckPassword 
    @Username VARCHAR(50), @InputPassword VARCHAR(255)
AS
-- Check that user exists
IF EXISTS (SELECT 1 FROM UserT WHERE UserT.Username = @Username)
BEGIN
    -- Get username password from user table
    DECLARE @PasswordFromDB AS VARCHAR(255) = (SELECT UserT.Password FROM UserT WHERE UserT.Username = @Username);
    -- Compare password
    IF (@PasswordFromDB = @InputPassword)
        -- Return that is was correct
		SELECT 'SUCCESS';
	ELSE
        -- Return that is was the wrong password
		SELECT 'WrongPassword';
END;
ELSE
    -- If user doesn't exist, then return error key
    SELECT 'UnknownUsername';


/*
* Procedure to get user information
*/
CREATE PROCEDURE GetUserTFromUsername @Username VARCHAR(50)
AS
-- Check that user exists
IF EXISTS (SELECT 1 FROM UserT WHERE UserT.Username = @Username)
BEGIN
    -- Return user values
    SELECT UserT.Email, UserT.Name, UserT.Birthdate
    FROM UserT
    WHERE UserT.Username = @Username
END;
ELSE
    -- If user doesn't exist, then return error key
    SELECT 'UnknownUsername';


/*
* Procedure to get stats from user
*/
CREATE PROCEDURE GetStatsFromUserT @Username VARCHAR(50)
AS
-- Check that user exists
IF EXISTS (SELECT 1 FROM UserT WHERE UserT.Username = @Username)
BEGIN
    -- Return stat values
    SELECT Stats.Wins, Stats.Lost, Stats.GamesPlayed
    FROM Stats
    WHERE Stats.ID = (SELECT UserT.ID FROM UserT WHERE UserT.Username = @Username);
END;
ELSE
    -- If user doesn't exist, then return error key
    SELECT 'UnknownUsername';


/*
* Procedure to add one win to a user
*/
CREATE PROCEDURE AddOneToWins
    @Username VARCHAR(50)
AS
BEGIN
-- Get user's stats.id
DECLARE @Stats_ID INTEGER = (SELECT UserT.ID FROM UserT WHERE UserT.Username = @Username);
-- Update wins
UPDATE Stats SET Stats.Wins = Stats.Wins + 1 WHERE Stats.ID = @Stats_ID;
-- Update games played
UPDATE Stats SET Stats.GamesPlayed = Stats.GamesPlayed + 1 WHERE Stats.ID = @Stats_ID;
END;


/*
* Procedure to add one lost to a user
*/
CREATE PROCEDURE AddOneToLost
    @Username VARCHAR(50)
AS
BEGIN
-- Get user's stats.id
DECLARE @Stats_ID INTEGER = (SELECT UserT.ID FROM UserT WHERE UserT.Username = @Username);
-- Update lost
UPDATE Stats SET Stats.Lost = Stats.Lost + 1 WHERE Stats.ID = @Stats_ID;
-- Update games played
UPDATE Stats SET Stats.GamesPlayed = Stats.GamesPlayed + 1 WHERE Stats.ID = @Stats_ID;
END;
    