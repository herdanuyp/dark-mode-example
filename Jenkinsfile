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
        sh 'ls -a'
        sh 'rm -rf yarn.lock'
        sh 'npm install'
      }
    }
  }
  environment {
    CI = 'true'
  }
}