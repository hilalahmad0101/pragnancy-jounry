import { getAllBlogCategoryUrl, getAllBlogUrl, loginUrl } from "@/utils/urls";
import { options } from "joi";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";


import toast from 'react-hot-toast';

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
    const [token, setToken] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [bloodPressure, setBloodPressure] = useState([]);
    const router = useRouter();
    const userLogin = async (users) => {
        const { email, password } = users;
        setLoading(true);
        if (email && password) {
            const res = await (await fetch(loginUrl, {
                method: 'POST',
                body: JSON.stringify(users),
                headers: { 'Content-Type': 'application/json' },
            })).json();
            if (res.error) {
                toast('Invalid Email and password', {
                    style: {
                        backgroundColor: "#d63031",
                        color: 'white',
                    },
                });
            } else {
                toast('Login Successfully', {
                    style: {
                        backgroundColor: "#55efc4",
                        color: 'white',
                    },
                });
                // router.push('/admin/dashboard');
                window.location.href="/admin/dashboard";
                localStorage.setItem('token', res.accessToken);
            }
            setLoading(false);
        } else {
            toast('Please fill all the field', {
                style: {
                    backgroundColor: "#d63031",
                    color: 'white',
                },
            });
            setLoading(false);
        }
    }


    const getAllCategory = async () => {
        const res = await (await fetch(getAllBlogCategoryUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
        })).json();
        setCategories(res)
    }

    const getAllBlog = async () => {
        const res = await (await fetch(getAllBlogUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
        })).json();
        setBlogs(res)
    }

    const getAllBloodPressure = async () => {
        const res = await (await fetch(getAllBloodPressure, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
        })).json();
        console.log(res);
        setBloodPressure(res)
    }

    const logoutUser=()=>{
        localStorage.removeItem('token');
        window.location.href="/";

    }
    useEffect(() => {
        getAllCategory();
        getAllBlog();
        getAllBloodPressure();
    }, [])

    return (
        <GlobalContext.Provider value={{
            token,
            userLogin, loading,
            categories, getAllCategory,
            blogs, getAllBlog,
            bloodPressure, getAllBloodPressure,logoutUser
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;