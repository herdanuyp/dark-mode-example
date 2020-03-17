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
        echo $PATH
        npm install
        '''
      }
    }
  }
  environment {
    HOME=.
  }
}