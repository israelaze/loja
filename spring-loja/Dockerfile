#FROM maven:3.8.6-amazoncorretto-17 as build
#WORKDIR /app
#COPY . .
#RUN mvn clean package -X -DskipTests

#FROM openjdk:17-ea-10-jdk-slim
#WORKDIR /app

#COPY --from=build ./app/target/*.jar /app/app.jar

#ENTRYPOINT [ "java", "-jar", "app.jar" ]

FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]