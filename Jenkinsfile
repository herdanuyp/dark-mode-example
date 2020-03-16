node {
  agent {
        docker {
            image 'node:12.6.1-alpine3.9'
            args '-p 3000:3000'
        }
    }

    stage('Clone repository') {
        checkout scm
    }

    stage('Build image') {

        // Install the dependencies
        sh 'npm install'

        // Build the project
        sh 'npm run build'

        // Build the docker image with the tag "dark-mode-example"
        sh 'docker build -t dark-mode-example .'

        // Export the docker image as dark-mode-example.tar file
        sh 'docker save -o dark-mode-example.tar dark-mode-example:latest'
    }

    stage('Push image') {

        // Push the image
        sh 'scp -o StrictHostKeyChecking=No dark-mode-example.tar root@localhost:3000/root'

        // Stop the running container
        sh 'ssh -o StrictHostKeyChecking=No root@localhost:3000 docker stop sample-container'

        // Remove the running container
        sh 'ssh -o StrictHostKeyChecking=No root@localhost:3000 docker rm sample-container'

        // Remove the current image
        sh 'ssh -o StrictHostKeyChecking=No root@localhost:3000 docker rmi dark-mode-example'

        // Load the new image
        sh 'ssh -o StrictHostKeyChecking=No root@localhost:3000 docker load -i dark-mode-example.tar'

        // Run the container
        sh 'ssh -o StrictHostKeyChecking=No root@localhost:3000 docker run -d --name sample-container -p 80:80 --restart=always dark-mode-example'
    }

    stage('Remove image from Jenkins') {

        // Remove the exported file
        sh 'rm dark-mode-example.tar'

        // Remove the docker image from Jenkins server
        sh 'docker rmi dark-mode-example'
    }
}