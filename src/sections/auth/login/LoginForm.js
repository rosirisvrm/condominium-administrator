import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
//
import { login } from '../../../services/auth'
import { setAuth, setLoadingLogin } from '../../../slices/authSlice';

// ----------------------------------------------------------------------

export default function LoginForm() {

  const navigate = useNavigate();
  
  const location = useLocation();

  const dispatch = useDispatch();

  const loadingLogin = useSelector(state => state.auth.loadingLogin);

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('El correo electrónico debe ser una dirección de correo electrónico válida').required('El correo electronico es requerido'),
    password: Yup.string().required('Se requiere una contraseña'),
  });

  const defaultValues = {
    email: '',
    password: '',
    // remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = async () => {
    dispatch(setLoadingLogin(true))

    setTimeout(() => {
      const authRequest = async () => {
        const authRes = await login(methods.getValues())

        dispatch(setAuth(authRes))
        dispatch(setLoadingLogin(false))
  
        if(authRes){
          const from = location.state?.from?.pathname || '/dashboard/home';
          navigate(from, { replace: true });
        }
      }
  
      authRequest()
    }, 2000)
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Correo electrónico" />

        <RHFTextField
          name="password"
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <RHFCheckbox name="remember" label="Recordar" /> */}
        <Link variant="subtitle2" underline="hover" style={{ cursor: 'pointer' }}>
          ¿Olvidó su contraseña?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loadingLogin}>
        Ingresar
      </LoadingButton>
    </FormProvider>
  );
}
