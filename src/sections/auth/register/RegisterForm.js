import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [repass, setRepass] = useState('');
  const [email, setEmail] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Full name is required'),
    phone: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    username: Yup.string().required('Username is required'),
    pass: Yup.string().required('Password is required'),
    repass: Yup.string().required('Repassword is required')
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      phone: '',
      username: '',
      pass: '',
      repass: '',
      email: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    },
  });

  const handleClick = () => {
    const data = {
      a: fullName,
      b: phone,
      c: email,
      d: username,
      e: pass,
      f: repass
    };
    async function insertAdmin() {
      // Chưa kiểm tra ràng buộc username không được trùng 
      // || email không được trùng || phone không được trùng



      // const res = await axios.post('', data);
      // // console.log(res.data);
      // if (res?.data?.message === 'Auth successful' && res?.data?.role !== 'user') {
      //   localStorage.setItem('adminInfo', JSON.stringify(res.data));
      //   navigate('/dashboard/app');
      // }
    }
    insertAdmin();
  };

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Full name"
              onChange={(e) => { setFullName(e.target.value) }}
              {...getFieldProps('fullName')}
              error={Boolean(touched.fullName && errors.fullName)}
              helperText={touched.fullName && errors.fullName}
            />

            <TextField
              fullWidth
              label="Phone number"
              onChange={(e) => { setPhone(e.target.value) }}
              {...getFieldProps('phone')}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />
          </Stack>
          <TextField
            fullWidth
            autoComplete="username"
            // type=""
            label="User name"
            onChange={(e) => { setUsername(e.target.value) }}
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Password"
              type={showPassword?'text':'password'}
              onChange={(e) => { setPass(e.target.value) }}
              {...getFieldProps('pass')}
              error={Boolean(touched.pass && errors.pass)}
              helperText={touched.pass && errors.pass}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Repassword"
              type={showPassword?'text':'password'}
              onChange={(e) => { setRepass(e.target.value) }}
              {...getFieldProps('repass')}
              error={Boolean(touched.repass && errors.repass)}
              helperText={touched.repass && errors.repass}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            onChange={(e) => { setEmail(e.target.value) }}
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick} loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  )
}
