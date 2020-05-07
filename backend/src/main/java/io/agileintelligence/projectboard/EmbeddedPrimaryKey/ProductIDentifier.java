package io.agileintelligence.projectboard.EmbeddedPrimaryKey;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ProductIDentifier implements Serializable {

    private String name;
    private String printer;
    private String writter;
    private int volume;

    public ProductIDentifier() {
    }

    public ProductIDentifier(String name, String printer, String writter, int volume) {
        this.name = name;
        this.printer = printer;
        this.writter = writter;
        this.volume = volume;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrinter() {
        return printer;
    }

    public void setPrinter(String printer) {
        this.printer = printer;
    }

    public String getWritter() {
        return writter;
    }

    public void setWritter(String writter) {
        this.writter = writter;
    }

    public int getVolume() {
        return volume;
    }

    public void setVolume(int volume) {
        this.volume = volume;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductIDentifier that = (ProductIDentifier) o;
        return volume == that.volume &&
                Objects.equals(name, that.name) &&
                Objects.equals(printer, that.printer) &&
                Objects.equals(writter, that.writter);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, printer, writter, volume);
    }
}








