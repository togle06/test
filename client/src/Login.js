import React from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}
const Gip1 = "http://192.168.101.40:8001/"
const defaultTheme = createTheme();

function Login() {
    const LoginFlag = 0;
    const dispatch = useDispatch();

    const handleSubmit  = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // setInputId(data.get('input_id'));
        // setInputPw(data.get('password'));

       const inputId = data.get('input_id');
       const inputPw = data.get('input_pw');


        // axios.post('/user_inform/onLogin', null, {
        //     params: {
        //     'user_id': inputId,
        //     'user_pw': inputPw
        //     }
        // })
        // axios.post('/user_inform/onLogin', null, {
        //     params: {
        //     'user_id': inputId,
        //     'user_pw': inputPw
        //     }
        // })
        // console.log('click login')
        // console.log('ID : ', inputId)
        // console.log('PW : ', inputPw)

        axios.post(Gip1 + "Login", null, {
            params: {
            'user_id': inputId,
            'user_pw': inputPw
            }

        })       
        .then(res => {
             console.log('res.data.sabon :: ', res.data[0].sabun)
            if(res.data[0].sabun === undefined){
                console.log('======================',res.data.msg)
                console.log(res)
                alert('입력하신 id 가 일치하지 않습니다.')
            } else if(res.data[0].sabun === null){
                console.log('======================','입력하신 비밀번호 가 일치하지 않습니다.')
                alert('입력하신 비밀번호 가 일치하지 않습니다.sabun=null')
            } else if(res.data[0].sabun === ""){
                console.log('======================','입력하신 비밀번호 가 일치하지 않습니다.')
                alert('입력하신 비밀번호 가 일치하지 않습니다.sanul=""')     
            } else if(res.data[0].sabun !== inputId) {
                console.log('======================','에러 inputId')
                alert('입력하신 비밀번호 가 일치하지 않습니다.inputId')  
                alert(res.data[0].sabun)  
                alert(inputId)  
                        console.log({
                            email: res.data[0].sabun,
                            password: inputPw,
                        });
            } else if(res.data[0].sabun === inputId) {
                console.log('======================','로그인 성공')
                // alert(res.data[0].sabun)
                sessionStorage.setItem('user_id', inputId)
                document.location.href = '/'
            }
            // 작업 완료 되면 페이지 이동(새로고침)
  
        })
        .catch()
    }
 
    //  useEffect(() => {
    //      axios.post('/http://localhost:8001/Login', {
    //         'user_id': inputId,
    //         'user_pw': inputPw
    //     })  
    //      .then(res => console.log(res))
    //      .catch()
    //  },[])

    
    // const onSubmitHandler = (event) => {
    //     // 버튼만 누르면 리로드 되는것을 막아줌
    //     event.preventDefault();

    //     console.log('Id', Id);
    //     console.log('Password', Password);
    //     axios.post("http://localhost:8001/Login", {
    //         Id: Id,
    //         Password: Password
    //     })
    //     .then((response) => {
    //         console.log(response);
    //         LoginFlag = response
    //     });
    //     if(LoginFlag = 0){
    //         return console.log('query error :',LoginFlag)
    //     }
    //     else
    //     {

    //     }
        
    //     // let body = {
    //     //     email: Email,
    //     //     password: Password,
    //     // }
    
       
    // }

    return (
        // <div style={{ 
        //     display: 'flex', justifyContent: 'center', alignItems: 'center', 
        //     width: '100%', height: '100vh'
        //     }}>
        //     <div>
        //         <label htmlFor='input_id'>ID : </label>
        //         <input type='text' name='input_id' value={inputId} onChange={handleInputId} />
        //     </div>
            
        //     <div>
        //         <label htmlFor='input_pw'>PW : </label>
        //         <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
        //     </div>
        //     <div>
        //         <button type='button' onClick={onClickLogin}>Login</button>
        //     </div>
        // </div>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="input_id"
              label="아이디"
              name="input_id"
              autoComplete="text"
            //   autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="input_pw"
              label="패스워드"
              type="password"
              id="input_pw"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
    )
}

export default Login;