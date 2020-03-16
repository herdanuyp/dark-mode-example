pipeline {
    agent {
        docker {
            image 'node:lts-alpine3.9'
            args '-p 3002:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
    }
}