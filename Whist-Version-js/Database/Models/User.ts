export class User {
    private username: string;
    private name: string;
    private mail: string;
    private birthdate: string;

    public GetUsername(): string {
        return this.username;
    }

    public GetName(): string {
        return this.name;
    }

    public GetMail(): string {
        return this.mail;
    }

    public GetBirthdate(): string {
        return this.birthdate;
    }

    constructor(username: string, name: string, mail: string, birthdate: string) {
        this.username = username;
        this.name = name;
        this.mail = mail;
        this.birthdate = birthdate;
    }
}