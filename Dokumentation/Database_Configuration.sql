CREATE TABLE UserT (
    ID INTEGER IDENTITY(1, 1),
    Username VARCHAR(50),
    Password VARCHAR(100),
    Email VARCHAR(100),
    Name VARCHAR(70),
    Birthday DATE,

    PRIMARY KEY(ID)
);

CREATE TABLE Stats(
    ID INTEGER,
    Wins INTEGER,
    Loses INTEGER,
    GamesPlayed INTEGER,

    PRIMARY KEY(ID)
);


CREATE PROCEDURE GetStatsFromUserT @ID INTEGER
AS
SELECT Stats.Wins, Stats.Loses, Stats.GamesPlayed
FROM Stats
WHERE Stats.ID = ID
GO;


CREATE PROCEDURE CreateUserT 
    @Username VARCHAR(50), 
    @Password VARCHAR(100), 
    @Email VARCHAR(100), 
    @Name VARCHAR(70),
    @Birthday DATE
AS
BEGIN
INSERT INTO UserT(Username, Password, Email, Name, Birthday)
VALUES(@Username, @Password, @Email, @Name, @Birthday)

INSERT INTO Stats(ID, Wins, Lost, GamesPlayed)
VALUES(@@IDENTITY, 0, 0, 0)
END