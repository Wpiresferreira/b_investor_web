'use client'

import styles from './page.module.css'
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useForm}  from "react-hook-form";
import Link from 'next/link';

export default function LoginForm() {
    const { register} = useForm();
    return (
        <>
            <div className={styles.title}><h1>Sign In</h1></div>
            <form className={styles.form}>
                <TextField
                    id="outlined-start-adornment"
                    label="Username"
                    required
                    sx={{ marginLeft: 'auto', marginRight: 'auto', width: '85%', backgroundColor: "white",borderRadius:"5px", color: "black"}}
                    InputLabelProps={{
                        required: false,
                    }}
                />

                <TextField
                    id="outlined-start-adornment"
                    label="Password"
                    variant="outlined"
                    required
                    sx={{ marginLeft: 'auto', marginRight: 'auto', width: '85%', backgroundColor: "white", borderRadius:"5px", color: "black" }}
                    InputLabelProps={{
                        required: false,
                    }}
                />
                <div className={styles.buttonHolder} >
                    <FormControlLabel control={<Checkbox />} label="Remember-me" sx={{ marginTop: "45px", marginLeft: "25px", float: "left" }} />
                    <Button variant="contained" sx={{ marginLeft: 'auto', marginRight: 'auto', width: '90%', height: "65px", marginTop: '20px', backgroundColor: '#2b5186', color: 'white' }}>Sign In</Button>
                </div>
                <div>
                    Don't have an account? <Link href="/signup">Sign Up</Link>
                </div>
            </form>
        </>
    )
}