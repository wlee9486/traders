/**
 * @author wheesunglee
 * @create date 2023-10-06 18:48:12
 * @modify date 2023-10-06 18:48:12
 */
package com.newus.traders.image.service;

import java.io.File;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.newus.traders.image.entity.Image;
import com.newus.traders.image.repository.ImageRepository;
import com.newus.traders.product.entity.Product;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;

    public void saveImage(List<MultipartFile> files, Product product) throws Exception {

        String projectPath = System.getProperty("user.dir") + "/src/main/resources/static/files";

        for (MultipartFile file : files) {

            UUID uuid = UUID.randomUUID();
            String filename = uuid + "_" + file.getOriginalFilename();

            File savedFile = new File(projectPath, filename);
            file.transferTo(savedFile);

            Image image = new Image(filename);
            image.setProduct(product);

            imageRepository.save(image);
        }
    }

    public void updateImage(List<Integer> removedFiles) throws Exception {
        deleteImage(removedFiles);
        imageRepository.deleteAllById(removedFiles);

    }

    public void deleteImage(List<Integer> removedFiles) throws Exception {

        String projectPath = System.getProperty("user.dir") + "/src/main/resources/static/files";

        for (Integer id : removedFiles) {

            Optional<Image> imageOptional = imageRepository.findById(id);
            if (imageOptional.isPresent()) {
                Image image = imageOptional.get();
                String filename = image.getFilename();

                File fileToDelete = new File(projectPath, filename);

                if (fileToDelete.exists()) {
                    if (!fileToDelete.delete()) {
                        throw new Exception("파일을 삭제할 수 없습니다.");
                    }
                } else {
                    throw new Exception("파일을 찾을 수 없습니다.");
                }
            } else {
                throw new Exception("해당 이미지를 찾을 수 없습니다.");
            }
        }
    }
}
