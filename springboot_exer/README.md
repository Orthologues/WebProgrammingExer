## Spring Boot 2.7.1 Demo Project
### 1. Maven Configuration (reference: <a>https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html</a>)
After setting up <code>pom.xml</code>, we would need to run <code>mvn package</code> for testing.<br />
To update maven dependencies specified at <code>README.md</code>, we would need to run <code>mvn dependency:tree</code><br />
### 2. Development
Then, run <code>mvn spring-boot:run</code> and run <code>curl -sSL localhost:8080</code><br />
### 3. Production
To generate a <code>.jar</code> file, run <code>mvn package</code> again, then run <code>java -jar target/demoproj-0.0.1-SNAPSHOT.jar</code>
