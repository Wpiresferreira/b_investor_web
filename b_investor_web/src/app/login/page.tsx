import Image from "next/image";
import styles from './page.module.css'
import LoginForm from "./loginForm";

export default async function Login() {
    return (
        <>
            <div className={styles.header} >
                <Image width={125} height={125} style={{ borderRadius: "50%", borderColor: "var(--primary-light)" }} src="/b_investor_logo2.png" alt="Logo" />
            </div>
            <div className={styles.main}>
                <LoginForm />
            </div>

        </>


    )
}

// <html lang="en">
//     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
//     <script src="script.js" defer></script>
//     <link rel="stylesheet" href="style.css" />
//     <link
//         rel="stylesheet"
//         href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
//     />

//     <link rel="preconnect" href="https://fonts.googleapis.com" />
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
//     <link
//         href="https://fonts.googleapis.com/css2?family=Asap:ital,wght@0,100..900;1,100..900&display=swap"
//         rel="stylesheet"
//     />

//     <head>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>B Investor</title>
//     </head>
//     <body onload="checkUserSaved()">
//         <header>
//             <img src="b_investor_logo2.png" alt="" srcset="" />
//         </header>
//         <main>
//             <div class="in-tittle">
//                 <h1>Sign in</h1>
//             </div>
//             <div class="in-box">
//                 <input type="email" name="in-username" id="in-username" />
//                 <label for="in-username" id="label-in-username">Username</label>
//                 <!-- <i class="fa fa-check" id="in-username-validation"></i> -->
//             </div>
//             <div class="in-box">
//                 <input type="password" name="in-password" id="in-password" />
//                 <label for="in-password" id="label-in-password">Password</label>
//                 <!-- <i class="fa fa-check" id="in-password-validation"></i> -->
//                 <i
//                     class="fa fa-eye-slash"
//                     id="in-password-visibility"
//                     onclick="toggleVisibility(this)"
//                 ></i>
//             </div>
//             <div id="in-message"></div>
//             <input type="checkbox" name="remember-me" id="in-checkbox" />
//             <label id="label-in-checkbox" for="remember-me">Remember-me</label>
//             <button type="button" id="in-button" onclick="login()">Sign In</button>
//             <div id="in-go-signup" onclick="goSignup()">
//                 <div>Don't have an account? </div>
//                 <div id="in-signup-link">Sign up</div>
//             </div>
//         </main>
//     </body>
// </html>
