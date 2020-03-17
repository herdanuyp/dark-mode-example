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
        ls -a
        sh 'rm -rf yarn.lock'
        sh 'yarn install'
      }
    }
  }
  environment {
    CI = 'true'
  }
}