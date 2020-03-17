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
        sh 'rm -rf yarn.lock'
        sh 'rm -rf node_modules'
        sh 'yarn install'
      }
    }
  }
  environment {
    CI = 'true'
  }
}