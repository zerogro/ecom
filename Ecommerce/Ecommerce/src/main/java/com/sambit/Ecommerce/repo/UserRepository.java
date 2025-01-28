package com.sambit.Ecommerce.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.sambit.Ecommerce.models.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}