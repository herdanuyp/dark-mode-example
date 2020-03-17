pipeline {
  agent {
    docker {
      image 'node:current-slim'
      args '-p 3100:3000'
    }
  }

  stages {
    stage('Environment') {
      steps {
        sh 'git --version'
        sh 'node --version'
        sh 'npm --version'
        sh 'yarn --version'
        sh 'docker -v'
        sh 'printenv'
      }
    }
    // stage('Build') {
    //   steps {
    //     sh 'npm install'
    //   }
    // }
    // stage('Deliver') {
    //   steps {
    //     sh './jenkins/scripts/deliver.sh'
    //     input message: 'Finished using the web site? (Click "Proceed" to continue)'
    //     sh './jenkins/scripts/kill.sh'
    //   }
    // }
  }
}
