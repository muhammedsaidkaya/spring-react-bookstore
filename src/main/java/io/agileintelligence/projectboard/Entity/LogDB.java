package io.agileintelligence.projectboard.Entity;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.LogDBIdentifier;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.sql.Time;
import java.util.Date;

@Entity
@Table(name="logdb")
public class LogDB {

    @EmbeddedId
    private LogDBIdentifier logDBIdentifier;
    private Date end_date;

    public LogDB() {
    }

    public LogDB(LogDBIdentifier logDBIdentifier, Date end_date) {
        this.logDBIdentifier = logDBIdentifier;
        this.end_date = end_date;
    }

    public LogDBIdentifier getLogDBIdentifier() {
        return logDBIdentifier;
    }

    public void setLogDBIdentifier(LogDBIdentifier logDBIdentifier) {
        this.logDBIdentifier = logDBIdentifier;
    }

    public Date getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Date end_date) {
        this.end_date = end_date;
    }
}
