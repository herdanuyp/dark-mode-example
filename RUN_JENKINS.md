# RUN JENKINS ON WINDOWS

Make sure you have installed docker in your system.

- Open your terminal and run

  ```sh
  $ docker --version
  ```

- Create a bridge network in Docker.

  ```sh
  $ docker network create jenkins
  ```

- Create the following volumes to share the Docker client TLS certificates needed to connect to the Docker daemon and persist the Jenkins data

  ```sh
  $ docker volume create jenkins-docker-certs
  $ docker volume create jenkins-data
  ```

And then install image dokcer:dind and jenkins/blueocean

- docker:dind

  ```sh
  $ docker container run --name jenkins-docker --rm --detach ^ --privileged --network jenkins --network-alias docker ^ --env DOCKER_TLS_CERTDIR=/certs ^ --volume jenkins-docker-certs:/certs/client ^ --volume jenkins-data:/var/jenkins_home ^ --volume "%HOMEDRIVE%%HOMEPATH%":/home ^ docker:dind
  ```

- jenkins/blueocean

  ```sh
  $ docker container run --name jenkins-blueocean --rm --detach ^ --network jenkins --env DOCKER_HOST=tcp://docker:2376 ^ --env DOCKER_CERT_PATH=/certs/client --env DOCKER_TLS_VERIFY=1 ^ --volume jenkins-data:/var/jenkins_home ^ --volume jenkins-docker-certs:/certs/client:ro ^ --volume "%HOMEDRIVE%%HOMEPATH%":/home ^ --publish 8080:8080 --publish 50000:50000 jenkinsci/blueocean
  ```

Make sure both (docker:dind and jenkins/blueocean is running in container)

```sh
$ docker container ls -a
# or
docker ps
```

And then open `localhost:8080` to start using jenkins

- Add a new Cloud

  Follow these steps to add a Docker cloud: [source](https://documentation.bonitasoft.com/bcd/3.0/jenkins_example)

  - Edit Jenkins system configuration (`Jenkins > Manage Jenkins > Configure System`) and Add a new cloud of type Docker.
  - Give it a Name and a Docker Host URI like `tcp://dockerhost:2376` (where dockerhost is the hostname or IP of the Docker host).
  - It is conventional to use port `2376` **when TLS is enabled**, and port `2375` **for un-encrypted communication with the Docker daemon**.
  - With a secured Docker TCP socket, select the Server credentials created previously. Otherwise, select None.
  - Click on Test Connection to confirm your configuration is correct.

---

## References

- Use a remote repository rather than a local repository for the best `Blue Ocean` experience. [link](https://jenkins.io/doc/book/blueocean/creating-pipelines/)
