FROM openjdk:17-jdk

ARG JAR_FILE=build/libs/*.jar

COPY ${JAR_FILE} app.jar

EXPOSE 8080
EXPOSE 5432

ENTRYPOINT ["java","-jar","/app.jar"]