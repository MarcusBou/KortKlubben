package dev.tgpgamez.whist;

public enum ErrorMessages {
    UserExists("UserExists", "This username or email is already used."),
    WrongUsernameOrPassword("WrongUsernameOrPassword", "Incorrect username or password"),
    UnknownUsername("UnknownUsername", "Could not find a user with this username.");

    private final String key;
    private final String message;

    private ErrorMessages(String key, String message) {
        this.key = key;
        this.message = message;
    }

    //WIN-M4KV389IKRL
    public static String get(String key) {
        for (ErrorMessages errors : ErrorMessages.values()) {
            if (errors.key == key) {
                return errors.message;
            }
        }
        return "Unknown message";
    }
}
