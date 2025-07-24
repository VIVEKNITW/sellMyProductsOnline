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
			cake.setName("Cake");
			cake.setDescription("Tasty and healthy sugar free cake");
			cake.setPrice(250.0);
			cake.setImageUrl("/images/products/cake.jpg");

			Product chocolate = new Product();
			chocolate.setName("Chocolate");
			chocolate.setDescription("80% dark sugar free chocolate bar");
			chocolate.setPrice(120.0);
			chocolate.setImageUrl("/images/products/chocolate.jpg");

			Product donut = new Product();
			donut.setName("Donut");
			donut.setDescription("Tasty sugar free donut");
			donut.setPrice(60.0);
			donut.setImageUrl("/images/products/donut.jpg");

			Product samosa = new Product();
			samosa.setName("Samosa");
			samosa.setDescription("Crispy tasty samosa");
			samosa.setPrice(40.0);
			samosa.setImageUrl("/images/products/samosa.jpg");


			productRepository.save(cake);
			productRepository.save(chocolate);
			productRepository.save(donut);
			productRepository.save(samosa);

			System.out.println("✅ Sample products inserted!");
		};
	}
}
