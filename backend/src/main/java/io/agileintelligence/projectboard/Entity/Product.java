package io.agileintelligence.projectboard.Entity;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.ProductIDentifier;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "product")
public class Product {

    @EmbeddedId
    private ProductIDentifier productIDentifier;

    private String brief;
    private String product_pic;
    private int cat_id;
    private double price;
    private int stock;

    public Product() {
    }

    public Product(ProductIDentifier productIDentifier, String brief, String product_pic, int cat_id, double price, int stock) {
        super();
        this.productIDentifier = productIDentifier;
        this.price = price;
        this.stock = stock;
        this.cat_id = cat_id;
        this.brief = brief;
        this.product_pic = product_pic;
    }

    public ProductIDentifier getProductIDentifier() {
        return productIDentifier;
    }

    public void setProductIDentifier(ProductIDentifier productIDentifier) {
        this.productIDentifier = productIDentifier;
    }

    public String getBrief() {
        return brief;
    }

    public void setBrief(String brief) {
        this.brief = brief;
    }

    public String getProduct_pic() {
        return product_pic;
    }

    public void setProduct_pic(String product_pic) {
        this.product_pic = product_pic;
    }

    public int getCategory_id() {
        return cat_id;
    }

    public void setCategory_id(int cat_id) {
        this.cat_id = cat_id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) { this.stock = stock; }
}
