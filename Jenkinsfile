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
        yarn config set registry https://registry.npmjs.org
        ping https://registry.npmjs.org
        yarn install
        '''
      }
    }

  }
}