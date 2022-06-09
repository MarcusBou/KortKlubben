import { BaseDatabase } from "./BaseDatabase";
import { User } from "./Models/User";

export class DBManager extends BaseDatabase {
    
    constructor(config: any) {
        super(config);
    }

    public async GetUserFromUsername(username: string): Promise<User> {
        await this.Open();
        let request: any = new this.sql.Request();
        request.query("CALL GetUserTFromUsername(?)", [username], function(err, recordset) {
            if (err) return null;
            console.log(recordset);
        });
        return new User("Test", "TEst", "awdaiwa", "09-06-2022");
    }

    public async GetUsers(): Promise<any> {
        await this.Open();
        let request: any = new this.sql.Request();
        request.query("SELECT * FROM UserT", function(err, recordset) {
        if (err) console.log(err)

        console.log(recordset);
        });
    }
}

let db: DBManager = new DBManager(require('./config.js'));

console.log(db.GetUserFromUsername("TGPGamez"));
// const config = require('./config.js');

// sql.connect(config, function(err) {
//     if(err) {
//         console.error("Error: " + err);
//     }
//     console.log("Connected to sql server");

//     let request: any = new sql.Request();
//     request.query("SELECT * FROM UserT", function(err, recordset) {
//         if (err) console.log(err)

//             console.log(recordset);
//     });
// });