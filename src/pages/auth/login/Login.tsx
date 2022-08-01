import { Button, Card, Checkbox, Col, Form, Input, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as API from "../../../config/ApiConfig";
import './Login.scss';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../config/AuthGuard';

const Login: React.FC = () => {
  let navigate = useNavigate();
  let location = useLocation() as any;
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";
  console.log(from, auth);

  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    console.log('Success:', values);   
    setLoading(true);     
    let res = API.Get('login').then((res: any) => {
      console.log(res);
      setLoading(false);     
    }).catch((err: any) => {
      console.log(err)
      setLoading(false);     
      const data = {
        id: 1,
        name: 'admin',
        access_token: 'xyz',
        refresh_token: 'xyz2'
      }
    // let username = formData.get("username") as string;
      localStorage.setItem('accessToken', data.access_token);
      auth.signin(data.access_token, () => {
        navigate(from, { replace: true });
      });
      navigate('/dashboard');
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return <div className="vh-100">
    <Row align={'middle'} className='h-100'>
      <Col xs={2} sm={4} md={6} lg={8} xl={9}></Col>
      <Col xs={20} sm={16} md={12} lg={8} xl={6}>
        <Card bordered={true}>
          <h1 className='text-center m-b-16'>Login</h1>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input size="large" placeholder="Username" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password size="large" placeholder="Password" prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col xs={2} sm={4} md={6} lg={8} xl={9}></Col>
    </Row>
  </div>
};

export default Login;
