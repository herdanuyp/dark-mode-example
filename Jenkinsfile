pipeline {
  agent {
    docker {
      image 'node:latest'
      args '-p 3003:3000'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }

  }
  environment {
    REACT_APP_DUMMY_BACKEND = 'https://dummy-backend-hayepe.firebaseio.com',
    DOCKER_HOST='tcp://docker:2376'
  }
}