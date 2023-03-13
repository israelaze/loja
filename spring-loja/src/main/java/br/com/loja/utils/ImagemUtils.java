package br.com.loja.utils;

import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import javax.imageio.ImageIO;

import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnails;

public class ImagemUtils {
	
	public static byte[] compressImage(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setLevel(Deflater.BEST_COMPRESSION);
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[4*1024];
        while (!deflater.finished()) {
            int size = deflater.deflate(tmp);
            outputStream.write(tmp, 0, size);
        }
        try {
            outputStream.close();
        } catch (Exception ignored) {
        }
        return outputStream.toByteArray();
    }

    public static byte[] decompressImage(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[4*1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(tmp);
                outputStream.write(tmp, 0, count);
            }
            outputStream.close();
        } catch (Exception ignored) {
        }
        return outputStream.toByteArray();
    }
    
    // Redimensionar imagens mantendo a proporção original
    public static byte[] resizeMultipartFileToByteArray(MultipartFile multipartFile) throws IOException {
       
    	int larguraMax = 600;
    	int alturaMax= 800;
    	
    	// Ler a imagem do MultipartFile
        BufferedImage inputImage = Thumbnails.of(multipartFile.getInputStream()).scale(1).asBufferedImage();

        // Obter as dimensões da imagem original
        int inputWidth = inputImage.getWidth();
        int inputHeight = inputImage.getHeight();

        // Determinar as dimensões da imagem redimensionada mantendo a proporção
        int outputWidth = inputWidth;
        int outputHeight = inputHeight;

        if (inputWidth > larguraMax || inputHeight > alturaMax) {
            double widthRatio = (double) larguraMax / inputWidth;
            double heightRatio = (double) alturaMax / inputHeight;
            double ratio = Math.min(widthRatio, heightRatio);

            outputWidth = (int) (inputWidth * ratio);
            outputHeight = (int) (inputHeight * ratio);
        }

        // Criar um objeto BufferedImage de saída com as dimensões calculadas
        BufferedImage outputImage = new BufferedImage(outputWidth, outputHeight, inputImage.getType());

        // Redimensionar a imagem usando Graphics2D
        Graphics2D graphics2D = outputImage.createGraphics();
        
        graphics2D.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        graphics2D.drawImage(inputImage, 0, 0, outputWidth, outputHeight, null);
        graphics2D.dispose();

        // Converter a imagem redimensionada em um array de bytes
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(outputImage, "jpg", baos);
        byte[] resizedImageByteArray = baos.toByteArray();

        return resizedImageByteArray;
    }


}
