import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { app, database } from "../firebase/config"
import { collection, addDoc, getDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    let router = useRouter()

    // useState variables
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [fireData, setFireData] = useState([])
    const [isUpdate, setIsUpdate] = useState(false)
    const [ID, setID] = useState(null)

    // connects to firebase database with name "CRUD Data"
    // if database doesn't exist, it gets created
    // change the string to change databases
    const databaseRef = collection(database, "CRUD Data")

    // logout function
    const logout = () => {
        sessionStorage.removeItem("Token")
        router.push("/register")
    }

    // CREATE
    // add data to database
    const addData = () => {
        addDoc(databaseRef, {
            name: name,
            age: Number(age),
        })
            .then(() => {
                console.log("Data saved")
                getData()
                setName("")
                setAge("")
            })
            .catch((err) => {
                console.error(err)
            })
    }

    // get data's ID, name, age and store in state
    // also renders update button due to state of setIsUpdate changing
    const getId = (id, name, age) => {
        setID(id)
        setName(name)
        setAge(age)
        setIsUpdate(true)
        // console.log({ id: id, name: name, age: age })
    }

    // READ
    // get all data from database
    const getData = async () => {
        await getDocs(databaseRef).then((res) => {
            setFireData(
                res.docs.map((data) => {
                    return { ...data.data(), id: data.id }
                })
            )
        })
    }

    // UPDATE
    // update data
    const updateData = async () => {
        let fieldToEdit = doc(database, "CRUD Data", ID)
        console.log(ID)
        await updateDoc(fieldToEdit, {
            name: name,
            age: Number(age),
        })
            .then(() => {
                console.log("Data updated")
                getData()
                setName("")
                setAge("")
                setID("")
                setIsUpdate(false)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    // DELETE
    // deletes item from DB by ID
    const deleteData = async (id) => {
        let fieldToEdit = doc(database, "CRUD Data", id)
        await deleteDoc(fieldToEdit)
            .then(() => {
                console.log("Deleted doc")
                getData()
            })
            .catch((err) => {
                console.error(err)
            })
    }

    // useEffect
    useEffect(() => {
        let token = sessionStorage.getItem("Token")
        if (token) {
            getData()
        }
        if (!token) {
            router.push("/register")
        }
    }, [])

    return (
        <>
            <Head>
                <title>Next Game Collector</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className="grid place-items-center h-screen">
                    <div className=" dark:text-gray-50">
                        <p className="text-3xl font-bold text-center p-4">Home Page</p>
                        <button onClick={logout} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">
                            Log Out
                        </button>
                        <div className="">
                            <input
                                placeholder="name"
                                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                type="text"
                            />
                            <input
                                placeholder="age"
                                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => setAge(e.target.value)}
                                value={age}
                                type="number"
                            />

                            {isUpdate ? (
                                <div>
                                    <button
                                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                                        onClick={updateData}>
                                        Update
                                    </button>
                                </div>
                            ) : (
                                <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900" onClick={addData}>
                                    ADD DATA
                                </button>
                            )}
                        </div>
                        <div>
                            {fireData.map((data) => {
                                return (
                                    <div key={data.id} className="p-2 grid grid-cols-2 border">
                                        <p className="text-xl font-bold">
                                            <span>{data.name}</span>
                                        </p>
                                        <p className="text-lg">
                                            <span>{data.age}</span>
                                        </p>
                                        <button
                                            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                                            onClick={() => getId(data.id, data.name, data.age)}>
                                            get ID
                                        </button>
                                        <button
                                            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                                            onClick={() => deleteData(data.id)}>
                                            delete
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
