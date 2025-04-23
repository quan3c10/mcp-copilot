export const TestConfig = {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/',
    credentials: {
        valid: {
            username: 'Admin',
            password: 'admin123'
        },
        invalid: {
            username: 'Admin',
            password: 'wrongpassword'
        }
    },
    timeouts: {
        default: 30000,
        short: 5000,
        long: 60000
    }
};