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
        sh '''
        ls -a
        rm -rf yarn.lock
        npm config rm https-proxy
        npm config rm proxy
        npm config set registry http://registry.npmjs.org/
        npm install
        '''
      }
    }
  }
  environment {
    CI = 'true'
  }
}