# Estágio de construção
FROM maven:3.8.4-openjdk-17 AS build

WORKDIR /app

# COPY . . adiciona todos os arquivos, incluindo os que não são necessários para a compilação
# Portanto, especificamos apenas o arquivo necessário para a compilação neste estágio
COPY pom.xml .
COPY src/ src/

RUN apt-get update && apt-get install -y wget

# Baixar e extrair o pacote libfreetype diretamente do repositório do Alpine
RUN wget -q -O - http://dl-cdn.alpinelinux.org/alpine/edge/main/x86_64/libfreetype-2.11.0-r0.apk | tar xz \
    && mvn package -DskipTests \
    && rm -rf target/generated-sources \
    && rm -rf target/surefire-reports \
    && rm -rf target/test-classes \
    && apt-get remove -y wget \
    && apt-get autoremove -y

# Estágio de execução
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/target/*.jar /app/app.jar

# Adiciona uma variável de ambiente para configurar o heap size (opcional)
ENV JAVA_OPTS="-Xmx1024m"

CMD ["java", "-jar", "app.jar"]
