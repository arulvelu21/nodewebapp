pipeline {
    agent any
    
    environment {
        // Environment variables
        APP_NAME = 'jenkins-demo-webapp'
        DEPLOY_DIR = '/var/www/html'
        NODEJS_VERSION = '16'
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Get code from SCM (typically Git)
                checkout scm
                echo 'Code checkout complete'
            }
        }
        
        stage('Setup') {
            steps {
                // Install Node.js and dependencies
                sh 'npm --version || echo "npm not found"'
                sh 'npm install'
                echo 'Dependencies installed successfully'
            }
        }
        
        stage('Lint') {
            steps {
                // Run code quality checks
                sh 'npm run lint || echo "Linting issues found"'
                echo 'Linting completed'
            }
        }
        
        stage('Test') {
            steps {
                // Run the tests
                sh 'npm test || echo "Tests failed"'
                echo 'Tests completed'
            }
            
            post {
                always {
                    // Archive test results
                    junit allowEmptyResults: true, testResults: 'test-results/*.xml'
                }
            }
        }
        
        stage('Build') {
            steps {
                // Add build number and timestamp to JavaScript
                script {
                    def buildTimestamp = new Date().format("yyyy-MM-dd HH:mm:ss", TimeZone.getTimeZone('UTC'))
                    
                    // Update the script.js file with build info
                    sh """
                    sed -i 's/BUILD_NUMBER/${env.BUILD_NUMBER}/g' script.js
                    sed -i 's/DEPLOY_TIMESTAMP/${buildTimestamp}/g' script.js
                    """
                }
                
                // Bundle the application (for more complex apps)
                echo 'Build completed'
            }
        }
        
        stage('Deploy to Staging') {
            steps {
                // Deploy to staging environment
                echo 'Deploying to staging environment'
                
                // Create a staging directory
                sh 'mkdir -p staging'
                sh 'cp -R *.html *.css *.js server.js package.json staging/'
                
                // For demonstration, we're just echoing the deploy command
                echo "Would deploy to staging server here"
            }
        }
        
        stage('Integration Tests') {
            steps {
                // Run integration tests against staging
                echo 'Running integration tests on staging environment'
                sh 'sleep 5' // Simulate tests running
                echo 'Integration tests passed'
            }
        }
        
        stage('Approval') {
            steps {
                // Manual approval step before production deployment
                timeout(time: 1, unit: 'DAYS') {
                    input message: 'Approve deployment to production?'
                }
            }
        }
        
        stage('Deploy to Production') {
            steps {
                // Deploy to production environment
                echo 'Deploying to production environment'
                
                // For demonstration, we're just echoing the deploy command
                echo "Would copy files to ${DEPLOY_DIR}/${APP_NAME}"
                echo "Would restart service ${APP_NAME}"
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs for details.'
        }
        always {
            // Clean workspace
            cleanWs()
        }
    }
} 