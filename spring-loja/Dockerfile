FROM maven:3.8.4-openjdk-17-slim AS build

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src/ /app/src/

RUN mvn package -DskipTests

FROM adoptopenjdk:17-jre-hotspot

WORKDIR /app

COPY --from=build /app/target/*.jar /app/app.jar

CMD ["java", "-jar", "app.jar"]
