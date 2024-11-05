package com.capfest.productdeco.Service;


import com.capfest.productdeco.Entity.Produit;
import com.capfest.productdeco.Repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProduitServiceImpl implements ProduitService {

    @Autowired
    private ProduitRepository ProduitRepositorys;

    @Override
    public Produit createProduit(Produit produit) {
        return ProduitRepositorys.save(produit);
    }

    @Override
    public Optional<Produit> getProduitById(Long id) {
        return ProduitRepositorys.findById(id);
    }

    @Override
    public List<Produit> getAllProduits() {
        return ProduitRepositorys.findAll();
    }

    @Override
    public Produit updateProduit(Long id, Produit produitDetails) {
        return ProduitRepositorys.findById(id).map(produit -> {
            produit.setNomProd(produitDetails.getNomProd());
            produit.setDescriptionProd(produitDetails.getDescriptionProd());
            produit.setPrix(produitDetails.getPrix());
            produit.setQuantiteEnStock(produitDetails.getQuantiteEnStock());
            produit.setCouleur(produitDetails.getCouleur());
            produit.setDateAjout(produitDetails.getDateAjout());
            return ProduitRepositorys.save(produit);
        }).orElseThrow(() -> new RuntimeException("Produit non trouvé"));
    }

    @Override
    public void deleteProduit(Long id) {
        ProduitRepositorys.deleteById(id);
    }
}
