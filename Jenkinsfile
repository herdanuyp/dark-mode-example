pipeline {
  agent {
    docker {
      image 'node:lts-alpine'
      args '-p 3003:3000'
    }
  }
  stages {
    stage('Build App') {
      steps {
        sh 'npm config rm proxy'
        sh 'npm config rm https-proxy'
        sh 'rm -rf yarn.lock'
        sh 'rm -rf node_modules'
        sh 'yarn install --network-timeout 1000000'
      }
    }
  }
  environment {
    CI = 'true'
  }
}