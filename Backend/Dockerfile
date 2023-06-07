FROM openjdk:17-jdk-alpine
ADD build/libs/*.jar /app/app.jar
COPY . ./app
WORKDIR /app
ENTRYPOINT ["java", "-jar", "./app.jar"]
EXPOSE 8080