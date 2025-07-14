package com.bakery;

import com.bakery.models.Product;
import com.bakery.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BakeryBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BakeryBackendApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(ProductRepository productRepository) {
		return args -> {
			Product cake = new Product();
			cake.setName("Chocolate Cake");
			cake.setDescription("Delicious chocolate sponge cake");
			cake.setPrice(299.0);
			cake.setImageUrl("https://example.com/chocolate-cake.jpg");

			Product pastry = new Product();
			pastry.setName("Strawberry Pastry");
			pastry.setDescription("Fresh strawberry cream pastry");
			pastry.setPrice(149.0);
			pastry.setImageUrl("https://example.com/strawberry-pastry.jpg");

			productRepository.save(cake);
			productRepository.save(pastry);

			System.out.println("✅ Sample products inserted!");
		};
	}
}
