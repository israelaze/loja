#FROM maven:3.8.6-amazoncorretto-17 as build
#WORKDIR /app
#COPY . .
#RUN mvn clean package -X -DskipTests

#FROM openjdk:17-ea-10-jdk-slim
#WORKDIR /app

#COPY --from=build ./app/target/*.jar /app/app.jar

#ENTRYPOINT [ "java", "-jar", "app.jar" ]

FROM maven:3.9.6-eclipse-temurin-17-alpine AS build

WORKDIR /app

COPY pom.xml .

COPY src ./src

RUN mvn clean package -DskipTests

FROM adoptopenjdk:17-jdk-openj9-alpine

WORKDIR /app

# Configurar variável de ambiente
#ENV LD_LIBRARY_PATH /usr/local/openjdk-17/lib/:$LD_LIBRARY_PATH

# Instalação da biblioteca libfreetype
#RUN apt-get update && apt-get install -y libfreetype6

COPY --from=build /app/target/*.jar /app/app.jar

CMD ["java", "-jar", "app.jar"]
