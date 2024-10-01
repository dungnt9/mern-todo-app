import React from 'react';
import { GoogleLogin } from 'react-google-login';

const LoginComponent = () => {
  const onSuccess = (response) => {
    console.log('Login Success: current user:', response.profileObj);
    // Xử lý thông tin người dùng ở đây
  };

  const onFailure = (response) => {
    console.error('Login Failed: res:', response);
  };

  return (
    <div style={{ position: 'absolute', top: 10, right: 10 }}>
      <GoogleLogin
        clientId="YOUR_CLIENT_ID" // Thay thế bằng Client ID của bạn
        buttonText="Đăng nhập bằng Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default LoginComponent;
