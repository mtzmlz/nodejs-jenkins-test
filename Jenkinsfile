node {
    env.NODEJS_HOME = "${tool 'nodejs'}"
    // on linux / mac
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
    stage('HelloWorld') {
        echo 'Hello World'
    }
    stage('Check npm installed'){
        sh 'npm --version'
    }
    stage('Get the code'){
        checkout scm
    }
    stage('Get the policy enforcer script'){
        sh 'wget http://localhost:8080/scripts/policy-enforcer.js'
    }
}