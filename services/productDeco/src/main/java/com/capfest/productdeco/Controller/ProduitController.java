package com.capfest.productdeco.Controller;


import com.capfest.productdeco.Entity.Produit;
import com.capfest.productdeco.Service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produits")

public class ProduitController {

    @Autowired
    private ProduitService ProduitServices;

    @PostMapping("/save")
    public ResponseEntity<Produit> createProduit(@RequestBody Produit produit) {
        Produit newProduit = ProduitServices.createProduit(produit);
        return new ResponseEntity<>(newProduit, HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Produit> getProduitById(@PathVariable Long id) {
        return ProduitServices.getProduitById(id)
                .map(produit -> new ResponseEntity<>(produit, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Produit>> getAllProduits() {
        List<Produit> produits = ProduitServices.getAllProduits();
        return new ResponseEntity<>(produits, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Produit> updateProduit(@PathVariable Long id, @RequestBody Produit produit) {
        try {
            Produit updatedProduit = ProduitServices.updateProduit(id, produit);
            return new ResponseEntity<>(updatedProduit, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduit(@PathVariable Long id) {
        ProduitServices.deleteProduit(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
