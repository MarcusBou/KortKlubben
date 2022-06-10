package dev.tgpgamez.whist.database;


import java.sql.*;

public abstract class BaseDatabase {
    private String connectionString;
    private String user;
    private String password;
    private Connection connection;
    //private final String conString = "jdbc:sqlserver://192.168.1.126;databaseName=WhistDatabase;trustServerCertificate=true";

    public BaseDatabase(String conString, String user, String password) {
        this.user = user;
        this.password = password;
        connectionString = conString;
    }

    protected Connection getConnection() {
        return connection;
    }

    protected void Open() {
        if (!isOpen()) {
            try {
                DriverManager.registerDriver(new com.mysql.jdbc.Driver());
                this.connection = DriverManager.getConnection(connectionString, this.user, this.password);
            } catch (SQLException e) {
                this.connection = null;
                throw new RuntimeException(e);
            }
        }
    }

    protected void Close() {
        if (isOpen()) {
            try {
                this.connection.close();
            } catch (SQLException e) {
                return;
            }
        }
    }

    protected boolean isOpen() {
        try {
            return this.connection != null && !this.connection.isClosed();
        } catch (SQLException e) {
            return false;
        }
    }

    protected ResultSet callProcedure(CallableStatement callableStatement) {
        if (!isOpen()) {
            Open();
        }
        try {
            return callableStatement.executeQuery();
        } catch (SQLException e) {
            return null;
        }

    }
}
