package com.sambit.Ecommerce.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.sambit.Ecommerce.models.Product;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {
    List<Product> findByCategory(String category);
    List<Product> findByNameContainingIgnoreCase(String name); // For searching products by name
}
