pipeline {
    agent {
        docker {
            image 'node:current-slim'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('node version') {
            steps {
                sh 'node --version'
                sh 'npm --version'
        }
    }
}