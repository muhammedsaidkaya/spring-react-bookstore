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

    @PostMapping("/addProduct")
    public ResponseEntity addProduct(@RequestBody Product product) {
        if( productService.addProduct(product)){ ;
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.unprocessableEntity().build();
    }

    @PutMapping("/updateProduct")
    public ResponseEntity updateProduct(@RequestBody Product product) {
        if(productService.updateProduct(product)){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.unprocessableEntity().build();
    }

    @DeleteMapping("/deleteProduct")
    public ResponseEntity deleteProduct(@RequestBody ProductIDentifier temp) {
        if( productService.deleteProduct(temp.getName(), temp.getPrinter(), temp.getWritter(), temp.getVolume())){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.unprocessableEntity().build();
    }

    @GetMapping("/category_id={id}")
    public List<Product> getProductsByCategory(@PathVariable int id) {
        return productService.getProductsByCategory(id);
    }

    /*@GetMapping("/category_id={cat_id}&page={page}")
    public List<Product> getProducts(@PathVariable int cat_id, @PathVariable int page) {
        return productService.getProducts(cat_id, page);
    }


    @GetMapping("/category_id={cat_id}&page={page}/sortBy={parameter}&is_increase={is_increase}")
    public List<Product> getProducts(@PathVariable int cat_id,
                                     @PathVariable int page,
                                     //@RequestParam(value = "sortBy") String parameter,
                                     @PathVariable String parameter,
                                     @PathVariable Boolean is_increase) {
        return productService.getProducts(cat_id, page, parameter, is_increase);
    }



    @GetMapping(path = "/name={name}&printer={printer}&writter={writter}&volume={volume}")
    public Optional<Product> getProduct(@PathVariable String name, @PathVariable String printer, @PathVariable String writter, @PathVariable int volume) {
        return productService.getProduct(name, printer, writter, volume);
    }
*/
    /* http://localhost:8080/products */


    @GetMapping("/search={search}")
    public List<Product> searchProduct(@PathVariable String search) {
        return productService.searchProduct(search);
    }


}
