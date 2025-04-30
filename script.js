// This script will be updated by the Jenkins pipeline
document.addEventListener('DOMContentLoaded', function() {
    // These values will be replaced during the CI/CD pipeline deployment
    const buildNumber = 'BUILD_NUMBER';
    const deployTime = 'DEPLOY_TIMESTAMP';
    
    document.getElementById('build-number').textContent = buildNumber;
    document.getElementById('deploy-time').textContent = deployTime;
    
    console.log('Application initialized with build:', buildNumber);
}); 