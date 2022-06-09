export abstract class BaseDatabase {
    private config: any;
    protected sql;

    constructor(config: any) {
        this.config = config;
        this.sql = require("mssql");
    }

    protected async Open(): Promise<any> {
        await this.sql.connect(this.config);
    };

    protected async Close(): Promise<any> {
        await this.sql.close();
    }
}


