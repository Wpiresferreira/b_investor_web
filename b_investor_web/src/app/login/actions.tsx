'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
const sessions: { sessionID: string, userLoggedID: string, sessionStart: number, ip: string }[] = [];

export async function login(prevState:any , formData: FormData) {
    let authed = false;    
    try {
        console.table( JSON.stringify(formData));
        const pathToUsers = path.join(process.cwd(), 'public/userData' , 'users.json');
        const listUsers = JSON.parse(fs.readFileSync(pathToUsers).toString());
        
        //const listUsers = JSON.parse(fs.readFileSync("users.json").toString());
        let filteredUsers = listUsers.filter((user: any) => {
            authed = user.email == formData.get("username") && user.password == formData.get("password");
            //userLogged = JSON.stringify(user);
        });
        if (!authed) {
            throw new Error("User/Password invalid");
        }
    } catch (error) {
        return { message: "Error: " + (error instanceof Error ? error.message : error) }
    }
    
    applyCookie(formData.get("username") as string);
    redirect('/dashboard');
}



function generateSessionID() {
    let sessionID = "";
    for (let i = 0; i < 12; i++) {
        let c = Math.floor(Math.random() * 62);
        if (c < 10) {
            c += 48;
        } else if (c < 36) {
            c += 55;
        } else {
            c += 61;
        }
        sessionID += String.fromCharCode(c);
    }
    console.log("sessionID : " + sessionID);
    return sessionID;
}

async function applyCookie(email: string) {
    try {
        const user = { username: email };
        const token = jwt.sign(user, process.env.SECRET_KEY_JWT as string, {
            expiresIn: "1h",
        });
        cookies().set({
            name: "AuthCookieTracking",
            value: token,
            httpOnly: true,
            path: "/",
            maxAge: 3600,
            sameSite: "strict",
        });
    } catch (error) {
        console.error("Error applying cookie: ", error);
    }
}