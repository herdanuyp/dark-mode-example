pipeline {
    environment {
        CACHE_DIR = "/var/jenkins_home/caches"

        GIT_URL = "https://github.com/herdanuyp/dark-mode-example.git"
        GIT_BRANCH = "master"
    }
    agent none
    stages {
        stage('Checkout code') {
            agent any
            steps {
                git (
                    branch: "${GIT_BRANCH}",
                    url: "${GIT_URL}",
                    changelog: true
                )
                sh '''
                    ls -al
                    cache_dir="${CACHE_DIR}"
                    cache_nm="${CACHE_DIR}node_modules"
                    cache_lock="${CACHE_DIR}yarn.lock"

                    if [ ! -d "$cache_dir" ]; then mkdir ${cache_dir}; fi
                    if [ ! -d "$cache_nm" ]; then mkdir ${cache_nm}; fi
                    if [ -d "$cache_nm" ]; then ln -sf ${cache_nm} ./; fi
                    if [ -f "$cache_lock" ]; then mv -n ${cache_lock} .; fi

                    ls -al
                '''
            }
        }
        stage('Build') {
            agent {
                docker {
                    image 'node:lts-alpine'
                    args ''
                }
            }
            steps {
                sh '''
                    yarn install
                    yarn build
                    tar -cvf build.tar build

                    ls -al
                    mv ./yarn.lock ${CACHE_DIR}
                    rm -rf ./node_modules
                    ls -al
                '''
                archiveArtifacts artifacts: 'build.tar', fingerprint: true
            }
        }
    }
}