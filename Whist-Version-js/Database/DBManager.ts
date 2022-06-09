import { BaseDatabase } from "./BaseDatabase";
import { User } from "./Models/User";

export class DBManager extends BaseDatabase {
    
    constructor(config: any) {
        super(config);
    }

    public async GetUserFromUsername(username: string): Promise<User> {
        await this.Open();
        let request: any = new this.sql.Request();
        request.input("Username", this.sql.VARCHAR, username);
        request.execute("GetUserTFromUsername").then(function(data) {
            if(data == null) {
                return null;
            }
            if (data.recordset == null) {
                return null;
            }
            return new User(username, data.recordset[0].Name, data.recordset[0].Email, data.recordset[0].Birthdate);
        });
        return null;
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