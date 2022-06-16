import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { styled } from '@mui/material/styles';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Box,
  Typography,
  Card,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
// import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <Box style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly' }}>
      <FormikProvider value={formik} style={{ width: '70%' }}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Tạo sản phẩm
          </Typography>
          <Stack spacing={3}>
            <TextField fullWidth autoComplete="tên sản phẩm" placeholder="tên sản phẩm" />

            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <TextField style={{ marginRight: '20px' }} placeholder="số lượng size S" />
              <TextField style={{ marginRight: '20px' }} placeholder="số lượng size M" />
              <TextField placeholder="số lượng size L" />
            </Box>
            <TextField required placeholder="mô tả sản phẩm" />
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <TextField fullWidth style={{ marginRight: '20px' }} placeholder="giá tiền" />
              <TextField fullWidth placeholder="discount" />
            </Box>
          </Stack>

          <LoadingButton
            style={{ marginTop: '20px' }}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Lưu sản phẩm
          </LoadingButton>
        </Form>
      </FormikProvider>
      <SectionStyle>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          Manage the job more effectively with Minimal
        </Typography>
        <img alt="register" src="/static/illustrations/illustration_register.png" />
      </SectionStyle>
    </Box>
  );
}
