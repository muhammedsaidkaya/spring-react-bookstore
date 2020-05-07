package io.agileintelligence.projectboard.Controller;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.ProductIDentifier;
import io.agileintelligence.projectboard.Service.ProductService;
import io.agileintelligence.projectboard.Entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    ProductService productService;


    @GetMapping
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    /* http://localhost:8080/products/category_id=1&page=0 */
    @GetMapping("/category_id={cat_id}&page={page}")
    public List<Product> getProducts(@PathVariable int cat_id, @PathVariable int page) {
        return productService.getProducts(cat_id, page);
    }


    /* http://localhost:8080/products/category_id=1&page=0/sortBy=price&is_increase=false */
    @GetMapping("/category_id={cat_id}&page={page}/sortBy={parameter}&is_increase={is_increase}")
    public List<Product> getProducts(@PathVariable int cat_id,
                                     @PathVariable int page,
                                     //@RequestParam(value = "sortBy") String parameter,
                                     @PathVariable String parameter,
                                     @PathVariable Boolean is_increase) {
        return productService.getProducts(cat_id, page, parameter, is_increase);
    }


    /* http://localhost:8080/products/brand=Xiaomi&name=MiA2lite */
    @GetMapping(path = "/name={name}&printer={printer}&writter={writter}&volume={volume}")
    public Optional<Product> getProduct(@PathVariable String name, @PathVariable String printer, @PathVariable String writter, @PathVariable int volume) {
        return productService.getProduct(name, printer, writter, volume);
    }

    /* http://localhost:8080/products */
    @PostMapping("/addProduct")
    public ResponseEntity<HttpStatus> addProduct(@RequestBody Product product) {
        System.out.println();
        if( productService.getProduct(product.getProductIDentifier().getName(),
                product.getProductIDentifier().getPrinter(),
                product.getProductIDentifier().getWritter(),
                product.getProductIDentifier().getVolume()).isPresent() == false){
                productService.addProduct(product);
                return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<HttpStatus>(HttpStatus.valueOf(406));
        }
    }

    /* http://localhost:8080/products */
    @PutMapping("/updateProduct")
    public ResponseEntity<HttpStatus> updateProduct(@RequestBody Product product) {
        if(productService.getProduct(product.getProductIDentifier().getName(),
                product.getProductIDentifier().getPrinter(),
                product.getProductIDentifier().getWritter(),
                product.getProductIDentifier().getVolume()).isPresent() == true){
            productService.updateProduct(product);
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<HttpStatus>(HttpStatus.valueOf(406));
        }
    }

    /* http://localhost:8080/products/brand=Xiaomi&name=MiA2 */
    @DeleteMapping("/deleteProduct")
    public void deleteProduct(@RequestBody ProductIDentifier temp) {
        productService.deleteProduct(temp.getName(), temp.getPrinter(), temp.getWritter(), temp.getVolume());
    }

    @GetMapping("/search={search}&page={page}")
    public List<Product> searchProduct(@PathVariable String search, @PathVariable int page) {
        return productService.searchProduct(search, page);
    }


}
