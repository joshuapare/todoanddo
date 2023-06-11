import React, { FC, useState } from 'react'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

interface LoginModalProps {
  
}

interface LoginForm {
  username: string;
  password: string;
}

const loginFormInitialState: LoginForm = {
  username: '',
  password: '',
}

export const LoginModal: FC<LoginModalProps> = ({  }) => {
  const [loginForm, setLoginForm] = useState<LoginForm>(loginFormInitialState);

  const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  }

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 4,
        gap: 1,
        textAlign: 'center',
        margin: 1
      }}
    >
      <h2>Login</h2>
      <TextField
        id="login-email"
        name="username"
        label="Username"
        type="email"
        value={loginForm.username}
        onChange={handleLoginFormChange}
      />
      <TextField
        id="login-password"
        name="password"
        label="Password"
        type="password"
        value={loginForm.password}
        onChange={handleLoginFormChange}
      />
      <Button variant="contained" color="primary">
        Login
      </Button>
    </Paper>
  )
}