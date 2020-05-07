package io.agileintelligence.projectboard.EmbeddedPrimaryKey;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.sql.Time;
import java.util.Date;
import java.util.Objects;

@Embeddable
public class LogDBIdentifier implements Serializable {

    private String user_email;
    private Date start_date;

    public LogDBIdentifier() {
    }

    public LogDBIdentifier(String user_email, Date start_date) {
        this.user_email = user_email;
        this.start_date = start_date;
    }

    public String getUser_email() {
        return user_email;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }

    public Date getStart_date() {
        return start_date;
    }

    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LogDBIdentifier that = (LogDBIdentifier) o;
        return Objects.equals(user_email, that.user_email) &&
                Objects.equals(start_date, that.start_date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user_email, start_date);
    }
}
