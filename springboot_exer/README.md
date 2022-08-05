## Spring Boot 2.7.1 Demo Project
### 1. Maven Configuration (reference: <a>https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html</a>)
After setting up <code>pom.xml</code>, we would need to run <code>mvn package</code> for testing.<br />
To update maven dependencies specified at <code>README.md</code>, we would need to run <code>mvn dependency:tree</code><br />
### 2. Development
Then, run <code>mvn spring-boot:run</code> and run <code>curl -sSL localhost:8080</code><br />
### 3. Production
To generate a <code>.jar</code> file, run <code>mvn clean package</code>, then run <code>java -jar target/demoproj-0.0.1-SNAPSHOT.jar</code>
### 4. Set up lazy initialization to speed up build time
<a>https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.spring-application.lazy-initialization</a>

## A more efficient way to set up a project:
Visit <b>https://start.spring.io/</b>, choose <b>Spring Boot 2.7.2</b>, <b>JAR</b>, and <b>Java 11</b>. <br /> 
Add <b>Spring Web</b>, <b>Spring Boot DevTools</b>, <b>Spring Data JPA</b>, <b>H2 Database</b>, <b>Spring Security</b> (don't use it for dev), <b>OAuth2 Client</b> (don't use it for dev), <b>Spring for GraphQL</b>, <b>PostgreSQL driver</b>, <b>Embedded MongoDB Database TESTING</b>, and <b>Spring Data Reactive MongoDB NOSQL</b> to "dependecies"<br />
Thus, run <br /> 
<code>cd demo && mvn clean package && java -jar target/demo-0.0.1-SNAPSHOT.jar & 
sleep 10 && curl -sSL localhost:8080</code>
