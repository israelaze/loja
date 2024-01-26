# Estágio de construção
FROM adoptopenjdk:17-jdk-hotspot AS build

WORKDIR /app

COPY pom.xml .
COPY src/ src/

RUN mvn package -DskipTests \
    && rm -rf target/generated-sources \
    && rm -rf target/surefire-reports \
    && rm -rf target/test-classes

# Estágio de execução
FROM alpine:latest

RUN apk update && apk add --no-cache libfreetype

WORKDIR /app

COPY --from=build /app/target/*.jar /app/app.jar

# Adiciona uma variável de ambiente para configurar o heap size (opcional)
ENV JAVA_OPTS="-Xmx1024m"

CMD ["java", "-jar", "app.jar"]