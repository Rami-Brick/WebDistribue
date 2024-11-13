FROM openjdk:17
EXPOSE 8083
ADD target/GatewayApi-0.0.1-SNAPSHOT.jar gatewayapi.jar
ENTRYPOINT ["java", "-jar", "gatewayapi.jar"]