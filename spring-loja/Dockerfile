#FROM maven:3.8.6-amazoncorretto-17 as build
#WORKDIR /app
#COPY . .
#RUN mvn clean package -X -DskipTests

#FROM openjdk:17-ea-10-jdk-slim
#WORKDIR /app

#COPY --from=build ./app/target/*.jar /app/app.jar

#ENTRYPOINT [ "java", "-jar", "app.jar" ]

FROM maven:3.8.4-openjdk-17-slim AS build

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src/ /app/src/

RUN mvn package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/target/*.jar /app/app.jar
EXPOSE 8080

CMD ["java", "-jar", "app.jar"]