'use client'

import styles from './page.module.css'
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useForm } from "react-hook-form";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { login } from './actions';
import { useFormState } from 'react-dom';

const initialState = {
    message: '',
}

export default function LoginForm() {
    const { register } = useForm();
    const [userIp, setUserIp] = useState("");
    const [state, formAction] = useFormState(login, initialState)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.ipify.org/?format=json");
                const result = await response.text();
                const resStatus = response.status;
                console.log(resStatus);
                setUserIp(JSON.parse(result));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [])

  

    return (
        <>
            <div className={styles.title}><h1>Sign In</h1></div>
            <form action={formAction} className={styles.form}>
                <TextField
                    id="outlined-start-adornment"
                    label="Username"
                    required={true}
                    {...register("username", { required: true })}
                    sx={{ marginLeft: 'auto', marginRight: 'auto', width: '85%', backgroundColor: "white", borderRadius: "5px", color: "black" }}
                    InputLabelProps={{
                        required: false,
                    }}
                />

                <TextField
                    id="outlined-start-adornment"
                    label="Password"
                    variant="outlined"
                    required={true}
                    {...register("password", { required: true })}
                    sx={{ marginLeft: 'auto', marginRight: 'auto', width: '85%', backgroundColor: "white", borderRadius: "5px", color: "black" }}
                    InputLabelProps={{
                        required: false,
                    }}
                />
                <p>{state?.message}</p>
                <div className={styles.buttonHolder} >
                    <FormControlLabel control={<Checkbox />} label="Remember-me" sx={{ marginTop: "45px", marginLeft: "25px", float: "left" }} />
                    <Button type="submit" variant="contained" sx={{ marginLeft: 'auto', marginRight: 'auto', width: '90%', height: "65px", marginTop: '20px', backgroundColor: '#2b5186', color: 'white' }}>Sign In</Button>
                </div>
                <div>
                    Don't have an account? <Link href="/signup">Sign Up</Link>
                </div>
            </form>
        </>
    )
}