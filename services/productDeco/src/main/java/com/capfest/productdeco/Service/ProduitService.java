package com.capfest.productdeco.Service;


import com.capfest.productdeco.Entity.Produit;

import java.util.List;
import java.util.Optional;

public interface ProduitService {
    Produit createProduit(Produit produit);
    Optional<Produit> getProduitById(Long id);
    List<Produit> getAllProduits();
    Produit updateProduit(Long id, Produit produit);
    void deleteProduit(Long id);
}
