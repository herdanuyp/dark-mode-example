// pipeline {
//   agent {
//     docker {
//       image 'node:current-slim'
//       args '-p 3100:3000'
//     }
//   }
//   environment {
//     CI = 'true'
//   }
//   stages {
//     stage('node version') {
//       steps {
//         sh 'node --version'
//         sh 'npm --version'
//       }
//     }
//     stage('Build') {
//       steps {
//         sh 'npm install'
//       }
//     }
//     stage('Test') {
//       steps {
//         sh './jenkins/scripts/test.sh'
//         }
//       }
//     stage('Deliver') {
//       steps {
//         sh './jenkins/scripts/deliver.sh'
//         input message: 'Finished using the web site? (Click "Proceed" to continue)'
//         sh './jenkins/scripts/kill.sh'
//       }
//     }
//   }
// }

node {
  try {
    stage('Checkout') {
      checkout scm
    }
    agent {
      docker {
        image 'node:current-slim'
        args '-p 3100:3000'
      }
    }
    stage('Environment') {
      sh 'git --version'
      sh 'node --version'
      sh 'npm --version'
      sh 'yarn --version'
      sh 'docker -v'
      sh 'printenv'
    }
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
  }
  catch (err) {
    throw err
  }
}