# Estágio de construção
FROM maven:3.8.4-openjdk-17 AS build

WORKDIR /app

# COPY . . adiciona todos os arquivos, incluindo os que não são necessários para a compilação
# Portanto, especificamos apenas o arquivo necessário para a compilação neste estágio
COPY pom.xml .
COPY src/ src/

RUN apk add --no-cache libfreetype6 \
    && mvn package -DskipTests \
    && rm -rf target/generated-sources \
    && rm -rf target/surefire-reports \
    && rm -rf target/test-classes

# Estágio de execução
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/target/*.jar /app/app.jar

# Adiciona uma variável de ambiente para configurar o heap size (opcional)
ENV JAVA_OPTS="-Xmx1024m"

CMD ["java", "-jar", "app.jar"]
