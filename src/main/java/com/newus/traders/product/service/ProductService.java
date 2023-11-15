/**
 * @author wheesunglee
 * @create date 2023-09-19 08:19:20
 * @modify date 2023-10-22 13:29:10
 * @author jeongyearim
/**
 * @author jeongyearim
 * @create date 2023-09-26 17:33:07
 * @modify date 2023-09-26 17:33:07
 * @desc [주어진 중심 위도와 경도를 기준으로 3km 반경 내의 상품 리스트를 뽑아옵니다.]
 */
package com.newus.traders.product.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.newus.traders.chat.document.ChatDto;
import com.newus.traders.chat.repository.ChatRepository;
import com.newus.traders.exception.CustomException;
import com.newus.traders.exception.ErrorCode;
import com.newus.traders.image.service.ImageService;
import com.newus.traders.product.dto.ProductDto;
import com.newus.traders.product.entity.Product;
import com.newus.traders.product.form.ProductForm;
import com.newus.traders.product.repository.ProductRepository;
import com.newus.traders.product.type.ProductStatus;
import com.newus.traders.redis.service.RedisService;
import com.newus.traders.user.entity.User;
import com.newus.traders.user.repository.UserRepository;
import com.newus.traders.user.service.CustomUserDetailsService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CustomUserDetailsService userDetailsService;
    private final RedisService redisService;
    private final ImageService imageService;
    private final ChatRepository chatRepository;

    public User getUser(String accessToken) {
        String username = userDetailsService.getUserDetails(accessToken);
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
    }

    public List<ProductDto> getAllProducts() {

        List<Product> productList = productRepository.findAll();

        if (productList.size() == 0) {
            throw new CustomException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        List<ProductDto> productDtoList = new ArrayList<>();
        for (Product product : productList) {

            ProductDto productDto = new ProductDto(product);

            Long likes = redisService.countLikes(product.getId());

            if (likes != null) {
                productDto.setLikes(likes);
            }

            productDtoList.add(productDto);
        }

        return productDtoList;
    }

    public List<ProductDto> getMyProducts(String accessToken) {
        User user = getUser(accessToken);

        List<Product> productList = productRepository.findBySeller(user);

        if (productList.size() == 0) {
            throw new CustomException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        List<ProductDto> productDtoList = new ArrayList<>();
        for (Product product : productList) {

            ProductDto productDto = new ProductDto(product);
            Long likes = redisService.countLikes(product.getId());

            if (likes != null) {
                productDto.setLikes(likes);
            }

            productDtoList.add(productDto);

        }

        return productDtoList;
    }

    public ProductDto getProduct(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));

        ProductDto productDto = new ProductDto(product);
        Long likes = redisService.countLikes(product.getId());

        if (likes != null) {
            productDto.setLikes(likes);
        }

        return productDto;
    }

    public List<ProductDto> getSearchedProducts(List<Long> productIdList) {

        return productIdList.stream().map(id -> (getProduct(id)))
                .collect(Collectors.toList());
    }

    @Transactional
    public String registerProduct(String accessToken, ProductForm productForm, List<MultipartFile> files) {

        User user = getUser(accessToken);

        Product product = new Product(user, productForm);

        productRepository.save(product);

        try {

            imageService.saveImage(files, product);

        } catch (Exception exception) {
            System.out.println(exception.getMessage());
            throw new CustomException(ErrorCode.PRODUCT_NOT_SAVED);
        }

        return "물품 등록을 완료하였습니다.";
    }

    @Transactional
    public String updateProduct(String accessToken, Long productId, ProductForm productForm,
            List<MultipartFile> newFiles, List<Integer> removedFiles) {

        User user = getUser(accessToken);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));

        if (user != product.getSeller() || !product.getStatus().equals(ProductStatus.AVAILABLE)) {

            throw new CustomException(ErrorCode.PRODUCT_NOT_UPDATED);
        }

        product.updateProduct(productForm);

        productRepository.save(product);

        try {
            if (newFiles != null && newFiles.size() != 0) {
                System.out.println("saveImage시작");
                imageService.saveImage(newFiles, product);
            }

            if (removedFiles != null && removedFiles.size() != 0) {
                System.out.println("deleteImage시작");

                imageService.updateImage(removedFiles);
            }

        } catch (Exception exception) {
            System.out.println(exception.getMessage());
            throw new CustomException(ErrorCode.PRODUCT_NOT_UPDATED);
        }

        return "물품 수정을 완료하였습니다.";
    }

    public String deleteProduct(String accessToken, Long productId) {

        User user = getUser(accessToken);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));

        if (user != product.getSeller()) {
            throw new CustomException(ErrorCode.PRODUCT_NOT_DELETED);
        }

        List<Integer> imagesToDelete = product.getImages().stream()
                .map(image -> image.getId())
                .collect(Collectors.toList());
        try {
            imageService.deleteImage(imagesToDelete);

        } catch (Exception exception) {
            System.out.println(exception.getMessage());

            throw new CustomException(ErrorCode.PRODUCT_NOT_DELETED);
        }
        productRepository.deleteById(productId);

        return "물품 삭제를 완료하였습니다.";
    }

    @Value("${jwt.secret}")
    String key;

    public void updateAfterTransaction(ProductDto product, Long clientInfo) {

        purchaseProduct(product.getId());

        String productId = product.getId().toString();
        String seller = product.getSeller();
        User user = userRepository.findById(clientInfo)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        String buyer = user.getUsername();

        String roomNum = Jwts.builder()
                .claim("productId", productId)
                .claim("seller", seller)
                .claim("buyer", buyer)
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();

        ChatDto chatDto = new ChatDto();
        chatDto.setText("거래완료");
        chatDto.setRoomNum(roomNum);
        chatRepository.save(chatDto);

    }

    public void purchaseProduct(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));

        product.purchaseProduct();

        productRepository.save(product);

    }

    public List<ProductDto> getNearestProducts(double latitude, double longitude) {
        // 3km 반경
        double distance = 3.0;

        List<Product> nearestProductList = productRepository.findByDistance(latitude, longitude, distance);

        if (nearestProductList.size() == 0) {
            throw new CustomException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        List<ProductDto> nearestProductDtoList = new ArrayList<>();

        for (Product product : nearestProductList) {

            ProductDto productDto = new ProductDto(product);
            Long likes = redisService.countLikes(product.getId());

            if (likes != null) {
                productDto.setLikes(likes);
            }

            nearestProductDtoList.add(productDto);
        }

        return nearestProductDtoList;
    }

}
